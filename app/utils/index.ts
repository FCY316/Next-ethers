import blockies from "ethereum-blockies";
import { Decimal } from "decimal.js";
import dayjs from "dayjs";

/**
 * 函数addDecimal用于将两个数字或字符串类型的数字相加，返回相加结果的字符串形式。
 * 此函数特别适用于需要进行高精度计算的场景，可以避免JavaScript中浮点数计算的精度问题。
 *
 * @param num1 第一个操作数，可以是数字或字符串类型的数字。
 * @param num2 第二个操作数，可以是数字或字符串类型的数字。
 * @returns 返回相加结果的字符串形式。
 */
export const addDecimal = (num1: number | string, num2: number | string) => {
  return new Decimal(num1).plus(num2).toString();
};

/**
 * 减去两个十进制数并返回结果。
 *
 * 此函数接受两个参数，可以是数字或字符串。它使用Decimal库来处理减法操作，
 * 以确保精确的十进制计算。这对于处理货币或其他需要高精度计算的场景非常有用。
 *
 * @param num1 第一个数，可以是数字或字符串。
 * @param num2 第二个数，可以是数字或字符串。
 * @returns 返回两个数相减的结果，以字符串形式表示。
 */
export const subtractDecimal = (
  num1: number | string,
  num2: number | string
) => {
  // 使用Decimal库进行减法运算，并将结果转换为字符串格式返回
  return new Decimal(num1).minus(num2).toString();
};

/**
 * 多乘以两个十进制数。
 *
 * 此函数旨在提供一种精确的乘法运算，适用于包含小数的数值计算。
 * 它使用了`Decimal`库来处理运算，以避免JavaScript中浮点数计算的精度问题。
 *
 * @param num1 第一个乘数，可以是数字或字符串形式的十进制数。
 * @param num2 第二个乘数，可以是数字或字符串形式的十进制数。
 * @returns 返回两个乘数的精确乘积，以字符串形式表示。
 */
export const multiplyDecimal = (
  num1: number | string,
  num2: number | string
) => {
  return new Decimal(num1).times(num2).toString();
};

/**
 * 分割小数点进行除法运算。
 *
 * 该函数接受两个参数，可以是数字或字符串。它使用`Decimal`库来处理除法运算，
 * 旨在提供更高精度的除法结果，避免JavaScript中浮点数计算的精度问题。
 *
 * @param num1 被除数，可以是数字或字符串。
 * @param num2 除数，可以是数字或字符串。
 * @returns 返回除法运算的结果，以字符串形式表示，确保了高精度。
 */
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
