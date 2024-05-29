import { Interface, InterfaceAbi } from "ethers";
const erc20Abi = require("./json/erc20.json");

type objKeyObjectType = {
  [key: string]: { address: string; abi: Interface | InterfaceAbi };
};
type numberAny = {
  [key: number]: objKeyObjectType;
};
if (process.env.REACT_NODE_ENV === "development") {
  console.log("环境", process.env.REACT_NODE_ENV);
  //开发环境
} else if (process.env.REACT_NODE_ENV === "test") {
  // 测试环境
  console.log("环境", process.env.REACT_NODE_ENV);
} else {
  //生产环境
  console.log("环境", process.env.REACT_NODE_ENV);
}

const contractAll: numberAny = {
  12306: {
    erc20: { abi: erc20Abi, address: "" },
  },
};
export default contractAll;
