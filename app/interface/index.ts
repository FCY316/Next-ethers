export interface MyResponseType<T = any> {
  code: number;
  msg: string;
  data: T;
}
