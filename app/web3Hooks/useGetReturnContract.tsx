import { Contract } from "ethers"
import useWallet from "@/app/store/useWallet";
// 获取合约事件返回的内容
// 传入合约
const useGetReturnContract = (contract: Contract | null) => {
    // 获取provider，在拿到返回值回用到
    // 拿到provider
    const { wallet: { provider } } = useWallet()
    /*
      hash:hash哈希
      evenName:合约事件名称，注意第一个字母大写
      parameterName:要获取的参数名
    */
    const getReturnContract = async (hash: string, evenName: string, parameterName: string) => {
        if (provider && contract) {
            try {
                // 获取交易的事件日志
                const receipt = await provider.getTransactionReceipt(hash);
                // 获取返回的创建的订阅的id
                if (receipt) {
                    ;
                    // 遍历logs
                    for (const log of [receipt.logs[1]]) {
                        // 通过合约的interface属性的parseLog的方法去解析返回的数据
                        const parsedLog: any = contract.interface.parseLog((log as any)) || [];
                        // 通过传入的参数判断是否结束函数并结果把return出去
                        if (parsedLog.name === evenName) {
                            return parsedLog.args[parameterName]
                        }
                    }
                }
            } catch (e) {
                console.log('useGetReturnContract', e);

            }
        }
    }
    return { getReturnContract }
}

/*
   其实根本不需要去调用getTransactionReceipt函数去获取
   在你监听交易成功时就回返回receipt，但是为了向上兼容为我还是这样做了
*/
export default useGetReturnContract