import { useCallback } from "react";
import { Buffer } from "buffer";
import { isAddress } from "ethers";
import useAddressType from "@/app/store/useAddressType";
const { bech32 } = require("bech32");
/**
 * @description: 地址转换Hooks
 * @return 返回
 *    addressConvert,       地址转换 会根据地址类型进行转换
 *    validateAddress,      判断是不是正确的地址 0x fb 都可以检查
 *    validateAddress0x,    判断是不是正确的0x地址
 *    validateAddressFb     判断是不是正确的fb地址
 *
 */
// 转换地址，可以转0x 也可以转fb 判断是不是正确的地址
const useAddressConvert = () => {
    // 地址类型 本地
    const { addressType } = useAddressType()
    // fb转换0x
    const transition0x = (address: string) => {
        const addrBuf = Buffer.from(
            bech32.fromWords(bech32.decode(address).words)
        );
        const OXaddress =
            "0x" +
            Array.prototype.map
                .call(new Uint8Array(addrBuf), (x) =>
                    ("00" + x.toString(16)).slice(-2)
                )
                .join("");
        return OXaddress;
    }
    // 0x 转fb
    const transitionfb = (address: string) => {
        const hexAddr = address.slice(2)
        const words = bech32.toWords(Buffer.from(hexAddr, "hex"));
        const FBaddress = bech32.encode("fb", words);
        return FBaddress;
    }
    // 地址转换的函数
    const addressConvert = useCallback((address: string) => {
        if (!address) return address
        try {
            // 判断addressType 是0x 还是fb 0x 转0x地址 fb 转fb地址
            if (addressType === '0x') {
                // 如果是0x就先判断是不是0x开头是的话直接返回
                if (address.slice(0, 2) === "0x") return address
                const OXaddress = transition0x(address)
                return OXaddress;
            } else if (addressType === 'fb') {
                // 如果是fb就先判断是不是fb开头是的话直接返回
                if (address.slice(0, 2) === "fb") return address
                // 不是fb开头就进行转换成fb地址
                const FBaddress = transitionfb(address)
                return FBaddress;
            }
            return address
        } catch (e) {
            console.log('useAddressConvert', e);
            return address;
        }
    }, [addressType])
    // 判断是不是正确的地址 0x 或者fb
    const validateAddress = (addr: string) => {
        try {
            if (addr.startsWith("fb")) {
                // 是的话转化为0x地址去检查
                const address0x = transition0x(addr);
                const flg = isAddress(address0x);
                return flg;
            } else if (addr.startsWith("0x")) {
                const flg = isAddress(addr);
                return flg;
            }
            return false;
        } catch (err) {
            return false;
        }
    };
    // 判断是不是正确的地址 0x 地址
    const validateAddress0x = (addr: string) => {
        try {
            if (addr.startsWith("0x")) {
                const flg = isAddress(addr);
                return flg;
            }
            return false;
        } catch (err) {
            return false;
        }
    };
    // 判断是不是正确的地址 fb
    const validateAddressFb = (addr: string) => {
        try {
            if (addr.startsWith("fb")) {
                // 是的话转化为0x地址去检查
                const address0x = transition0x(addr);
                const flg = isAddress(address0x);
                return flg;
            }
            return false;
        } catch (err) {
            return false;
        }
    };
    return { addressConvert, validateAddress, validateAddress0x, validateAddressFb }
}

export default useAddressConvert