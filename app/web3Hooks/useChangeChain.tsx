import { useState } from "react";
import { chainParams } from '@/app/abi/chain'
import useWallet from "@/app/store/useWallet";
// 切换链,如果切换没有成功，那么就是没有fibo链，会进行添加网络
const useChangeChain = () => {
    const [changeChainIDLod, setLoading] = useState(false)
    // 拿到provider
    const { wallet: { provider } } = useWallet()
    // 切换链,如果切换链失败就添加链
    // 切换链
    const changeChainID = async (chainID: number) => {
        try {
            provider && await (provider as any).send("wallet_switchEthereumChain", [
                { chainId: `0x${chainID.toString(16)}` },
            ]);
        } catch (e: any) {
            console.log('changeChainID', e);
            // 当用户code不等于4001代表不是用户拒绝，而是因为某些原因导致
            if (e?.info?.error?.code !== 4001) {
                addChainID(chainID)
            }
        }
    }
    // 添加链
    const addChainID = async (chainID: number) => {
        setLoading(true)
        try {
            const data = {
                ...chainParams[chainID],
                chainId: `0x${chainID.toString(16)}`,
            };
            // 发送添加链的请求
            provider && await (provider as any).send("wallet_addEthereumChain", [data]);
        } catch (e) {
            console.log('useChangeChain', e);
        }
        setLoading(false)
    }
    return { changeChainID, changeChainIDLod }
}

export default useChangeChain