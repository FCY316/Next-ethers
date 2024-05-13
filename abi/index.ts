import { Interface, InterfaceAbi } from "ethers";
const erc20Abi = require("./json/erc20.json");

type objKeyObjectType = {
  [key: string]: { address: string; abi: Interface | InterfaceAbi };
};
type numberAny = {
  [key: number]: objKeyObjectType;
};
console.log("环境", process.env.NODE_ENV);
// if (process.env.NODE_ENV === "development") {
//   //开发环境
//   FContact.erc20.address = "";
// } else if (process.env.NODE_ENV === "test") {
//   // 测试环境
//   FContact.erc20.address = "";
// } else {
//   //生产环境
//   FContact.erc20.address = "";
// }

const contractAll: numberAny = {
  12306: {
    erc20: { abi: erc20Abi, address: "" },
  },
};
export default contractAll;
