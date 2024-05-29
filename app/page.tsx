'use client'
import Copy from "@/components/copy";
import useAddressConvert from "@/hooks/useAddressConvert";
import useAddressType from "@/store/useAddressType";
import useWallet from "@/store/useWallet";

export default function Home() {
  const { addressConvert } = useAddressConvert()
  const { addressType, setAddressType } = useAddressType()
  const { connectedWallet, wallet: { address } } = useWallet()
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
