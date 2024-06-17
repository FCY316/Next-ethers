//  白名单
export const chainIDArr = [12306, 65, 12307];
export const chainParams: any = {
    12306: {
        chainId: 12306,
        chainName: "FiboChain", // 自定义链的名称
        nativeCurrency: {
            name: "FIBO",
            symbol: "FIBO",
            decimals: 18,
        },
        rpcUrls: ["https://node1.fibo-rpc.asia"],
        blockExplorerUrls: ['https://scan.fibochain.org/'],
    },
    12307: {
        chainId: 12307,
        chainName: "FiboChainTest", // 自定义链的名称
        nativeCurrency: {
            name: "FIBO",
            symbol: "FIBO",
            decimals: 18,
        },
        rpcUrls: ["http://120.27.158.163:8545/"],
        blockExplorerUrls: ['https://scan.fibochain.org/'],
    },
    56: {
        chainId: 56,
        chainName: "Binance Smart Chain Mainnet", // 自定义链的名称
        nativeCurrency: {
            name: "Binance Chain Native Token",
            symbol: "BSC",
            decimals: 18,
        },
        rpcUrls: ["https://bsc-dataseed1.binance.org"],
        blockExplorerUrls: ['https://bscscan.com/'],
    }
};
// 钱包
export const walletList: {
    [key: string]: {
        walletIs: string, // 检查是否有钱包 tp钱包检查是看ethereum.isTokenPocket 而连接仍是ethereum
        ethereum: string, // 初始化的ethereum
        download: string, // 下载链接
    };
} = {
    'MetaMask': {
        walletIs: "ethereum",
        ethereum: 'ethereum',
        download: "https://metamask.io/",

    },
    'TokenPocket': {
        walletIs: "ethereum.isTokenPocket",
        ethereum: 'ethereum',
        download: "https://extension.tokenpocket.pro/#/",
    }

}