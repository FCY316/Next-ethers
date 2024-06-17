'use client'
import Copy from "@/app/components/copy";
import useAddressConvert from "@/app/hooks/useAddressConvert";
import useAddressType from "@/app/store/useAddressType";
import useWallet from "@/app/store/useWallet";

export default function Home() {
  const { addressConvert } = useAddressConvert()
  const { addressType, setAddressType } = useAddressType()
  const { connectedWallet, wallet: { address }, contract: { erc20 } } = useWallet()
  return (
    <>
      <span onClick={() => { connectedWallet() }} >123</span>
      <button onClick={() => {
        if (addressType === '0x') {
          setAddressType('fb')
        } else {
          setAddressType('0x')
        }
      }}>setAddressType</button>
      {addressConvert(address)} <Copy msg="123" /></>
  );
}
