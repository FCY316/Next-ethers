import { Contract, Provider, Signer, ethers } from "ethers";
import { create } from "zustand";
import { download, walletNameList, walletNameListShow } from "@/walletName";
import contractAll from "@/abi";
import { stringKeyObj } from "@/interface";
import { chainIDArr, chainParams } from "@/chain";
import { enqueueSnackbar } from "notistack";

type walletType = {
  provider: Provider | null;
  signer: Signer | null;
  address: string;
  walletName: string;
  chainId: number;
};
type ContractType = {
  erc20: Contract | null;
};
const initialContract: ContractType = {
  erc20: null,
};
interface AppState {
  wallet: walletType;
  contract: ContractType;
  connectedWallet: (walletName?: string) => void;
  breakWallet: () => void;
}

export const useWallet = create<AppState>((set) => {
  let switchState = false;
  let netWorkState = false;
  let addressState = false;
  let initialWallet = {
    provider: null,
    signer: null,
    address: "",
    walletName: "",
    chainId: 0,
  };
  // 连接钱包
  const connectedWallet = async (walletName: string = "MetaMask") => {
    try {
      if (eval(`window.${walletNameListShow[walletName]}`)) {
        const provider = new ethers.BrowserProvider(
          eval(`window.${walletNameList[walletName]}`)
        );
        console.log(123);

        // 获取signer
        const signer = await provider.getSigner();
        // 获取地址address
        const address = await signer.getAddress();
        // 获取网络信息
        const network = await (provider as any).getNetwork();
        // 输出当前连接的链的信息
        // 将链 ID 转换为字符串，并去掉后缀 "n"
        const chainIdWithoutSuffix = network.chainId.toString();
        const chainId = Number(
          chainIdWithoutSuffix.endsWith("n")
            ? chainIdWithoutSuffix.slice(0, -1)
            : chainIdWithoutSuffix
        );
        let contract: stringKeyObj = {};
        // 遍历出当前chainId下的合约
        Object.keys(contractAll[chainId] || {}).forEach((key) => {
          if (contractAll[chainId][key].address) {
            contract[key] = new Contract(
              contractAll[chainId][key].address,
              contractAll[chainId][key].abi,
              signer
            );
          }
        });
        // 本地没有连接过的钱包的话，存入本地，有的话不存
        if (typeof window !== "undefined") {
          const storedWalletName = localStorage.getItem("walletName");
          !storedWalletName && localStorage.setItem("walletName", walletName);
        }
        // 监听网络
        if (!netWorkState) {
          eval(`window.${walletNameList[walletName]}`)?.on(
            "chainChanged",
            (newNetwork: any) => {
              const chainID = Number(newNetwork);
              // 查看切换的链是否是我们支持的链
              if (chainIDArr.indexOf(chainID) === -1) {
                enqueueSnackbar(
                  `You are currently under Chain${chainID} and cannot provide service for you`,
                  { variant: "warning" }
                );
                connectedWallet(walletName);
              }
            }
          );
          netWorkState = true;
        }
        // 监听地址
        if (!addressState) {
          eval(`window.${walletNameList[walletName]}`)?.on(
            "accountsChanged",
            () => {
              connectedWallet(walletName);
            }
          );
          addressState = true;
        }
        // 当各种状态都更新完之后再查看用户的所在链
        if (chainIDArr.indexOf(chainId) === -1 && !switchState) {
          try {
            provider &&
              (await (provider as any).send("wallet_switchEthereumChain", [
                { chainId: `0x${chainIDArr[0].toString(16)}` },
              ]));
          } catch (e: any) {
            console.log("changeChainID", e);
            // 当用户code不等于4001代表不是用户拒绝，而是因为某些原因导致
            if (e?.info?.error?.code !== 4001) {
              try {
                const data = {
                  ...chainParams[chainIDArr[0]],
                  chainId: `0x${chainIDArr[0].toString(16)}`,
                };
                // 发送添加链的请求
                provider &&
                  (await (provider as any).send("wallet_addEthereumChain", [
                    data,
                  ]));
              } catch (e) {
                console.log("useChangeChain", e);
              }
            }
          }
          switchState = true;
        }
        set((state) => ({
          ...state,
          wallet: { ...state.wallet, provider, signer, address, chainId },
          contract: contract as ContractType,
        }));
      } else {
        window.open(download[walletName]);
      }
    } catch (e) {
      console.log("Error connecting wallet:", e);
    }
  };
  // 断开钱包
  const breakWallet = () => {
    localStorage.removeItem("walletName");
    set((state) => ({
      ...state,
      wallet: { ...initialWallet },
      contract: { ...initialContract },
    }));
  };
  // 读取本地的钱包名称,判断是否自动连接
  if (typeof window !== "undefined") {
    const storedWalletName = localStorage.getItem("walletName");
    // 如果本读有钱包名称，就连接并写入缓存
    if (storedWalletName) {
      initialWallet = {
        ...initialWallet,
        walletName: storedWalletName,
      };
      connectedWallet(storedWalletName);
    }
  }
  return {
    wallet: initialWallet,
    contract: initialContract,
    connectedWallet,
    breakWallet,
  };
});

export default useWallet;
