import blockies from "ethereum-blockies";
import { Decimal } from "decimal.js";
import dayjs from "dayjs";

export const addDecimal = (num1: number | string, num2: number | string) => {
  return new Decimal(num1).plus(num2).toString();
};

export const subtractDecimal = (
  num1: number | string,
  num2: number | string
) => {
  return new Decimal(num1).minus(num2).toString();
};

export const multiplyDecimal = (
  num1: number | string,
  num2: number | string
) => {
  return new Decimal(num1).times(num2).toString();
};

export const divideDecimal = (num1: number | string, num2: number | string) => {
  return new Decimal(num1).dividedBy(num2).toString();
};

// 时间转换
export function formatTimeToStr(
  times: any,
  format: string = "YYYY-MM-DD HH:mm:ss"
) {
  return dayjs(times).format(format);
}
// ，如果等于0那么就显示0，如果大于0就保留两位小数+..
export const formatNumber = (value: string): string => {
  if (!Number(value)) return "0";
  // 将输入值转换为字符串
  const stringValue = String(value);
  // 将字符串转换为数字，如果无法解析则返回原始字符串
  const numericAmount = parseFloat(stringValue);
  // 检查输入是否为有效的数字
  if (isNaN(numericAmount)) {
    return stringValue; // 如果无法解析为有效数字，则返回原始输入
  }
  // 使用 toFixed 方法将小数位数限制为两位，然后转换为字符串
  const formattedAmount = truncateDecimals(value, 2) + "";
  // 使用正则表达式去除末尾多余的零和可能的小数点
  const cleanedAmount = formattedAmount.replace(/(\.0*|0+)$/, "");
  // 检查小数位数是否超过两位，如果超过，则添加省略号
  const decimalCount = ((numericAmount + "").split(".")[1] || "").length;
  if (decimalCount > 2) {
    return cleanedAmount + "..";
  }
  return cleanedAmount;
};

// 数据脱敏
export const mobileHidden = (
  value: string,
  start: number = 10,
  end: number = 4,
  d: number = 3
) => {
  const n = start - 1 + d;
  if (value) {
    const valueArray = value.split("");
    for (let i = start; i < valueArray.length - end; i++) {
      valueArray[i] = ".";
      if (i > n) {
        valueArray[i] = "";
      }
    }
    return valueArray.join("");
  }
};
// 通过地址去生成图像
export const ethereumAddressImage = (address: string) => {
  // 创建一个新的 <canvas> 元素
  const canvas = document.createElement("canvas");
  const canvasSize = 64; // 设置画布大小，根据需要调整
  // const fontSize = 16; // 文本字体大小

  canvas.width = canvasSize;
  canvas.height = canvasSize;

  // 在画布上绘制 blockies 图像
  const context = canvas.getContext("2d");
  const img = blockies.create({ seed: address.toLowerCase() });
  context?.drawImage(img, 0, 0, canvasSize, canvasSize); // 绘制 blockies 图像到画布

  // 创建一个新的临时 <canvas> 元素用于裁剪成圆形
  const circularCanvas = document.createElement("canvas");
  circularCanvas.width = canvasSize;
  circularCanvas.height = canvasSize;

  // 在临时画布上绘制圆形图像
  const circularContext = circularCanvas.getContext("2d");
  circularContext?.beginPath();
  circularContext?.arc(
    canvasSize / 2,
    canvasSize / 2,
    canvasSize / 2,
    0,
    2 * Math.PI
  );
  circularContext?.closePath();
  circularContext?.clip();
  circularContext?.drawImage(canvas, 0, 0, canvasSize, canvasSize);
  // 将临时画布内容转换为图片格式（PNG）
  const imageDataURL = circularCanvas.toDataURL("image/png");
  return imageDataURL; // 返回生成的圆形图片地址
};
// 检测是不是fb或者0x地址
export const isValidAddress = (inputString: string) => {
  // 匹配以 "fb" 开头的 41 位字符串，其中包含数字和英文
  const regex1 = /^fb[0-9a-zA-Z]{39}$/;

  // 匹配以 "0x" 开头的 42 位字符串，其中包含数字和英文
  const regex2 = /^0x[0-9a-zA-Z]{40}$/;

  // 使用正则表达式测试输入字符串
  if (regex1.test(inputString) || regex2.test(inputString)) {
    return true; // 字符串符合要求
  } else {
    return false; // 字符串不符合要求
  }
};
// 保留几位小数并转化为欧式数字和加上想要的符号
export const cheengeNumber = (
  iValue: string,
  digit: number,
  ellipsis: string = ""
) => {
  if (Number(iValue) === 0) {
    return "0";
  }
  var p = (truncateDecimals(iValue, digit) + "").split(".");
  var chars = p[0].split("").reverse();
  var newstr = "";
  var count = 0;
  for (const x in chars) {
    count++;
    if (count % 3 === 1 && count !== 1) {
      newstr = chars[x] + "," + newstr;
    } else {
      newstr = chars[x] + newstr;
    }
  }
  if (digit === 0) {
    return newstr;
  } else if (ellipsis !== "") {
    return newstr + "." + p[1] + ellipsis;
  }
  return p[1] ? newstr + "." + p[1] : newstr + "";
};
// 控制小数的截取位数
export function truncateDecimals(number: string, digits: number) {
  const originalValue = new Decimal(number);
  const roundedValueDown = originalValue.toFixed(digits, Decimal.ROUND_DOWN);
  return roundedValueDown.toString();
}
