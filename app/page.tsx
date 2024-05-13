'use client'
import Copy from "@/components/copy";
import useWallet from "@/store/useWallet";

export default function Home() {
  const { connectedWallet, wallet: { address }, contract: { erc20 } } = useWallet()
  return (
    <>
      <span onClick={() => { connectedWallet() }} >123</span>
      {address} <Copy msg="123" /></>
  );
}
