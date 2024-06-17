import { Interface, InterfaceAbi } from "ethers";
const erc20Abi = require("./json/erc20.json");
console.log("环境", process.env.REACT_NODE_ENV);
const contractAll: {
  [key: number]: {
    [key: string]: { address: string; abi: Interface | InterfaceAbi };
  };
} = {
  12306: {
    erc20: { abi: erc20Abi, address: "" },
  },
};
if (process.env.REACT_NODE_ENV === "development") {
  contractAll[12306].erc20.address = "";
  //开发环境
} else if (process.env.REACT_NODE_ENV === "test") {
  // 测试环境
  contractAll[12306].erc20.address = "";
} else {
  //生产环境
  contractAll[12306].erc20.address = "";
}

export default contractAll;
