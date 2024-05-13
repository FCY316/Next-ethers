export interface stringKey {
  [key: string]: string;
}
export interface numberKey {
  [key: number]: string;
}
export interface stringKeyObj {
  [key: string]: object;
}
export interface MyResponseType<T = any> {
  code: number;
  msg: string;
  data: T;
}
export interface RouteObjects {
  // 让不让menu读取
  menuReady?: boolean;
  name?: string;
  // 你懂的
  children?: RouteObjects[];
  // 你懂的
  element?: React.ReactNode;
  // 你懂的
  path?: string;
  // 权限校验
  auth?: boolean;
}
