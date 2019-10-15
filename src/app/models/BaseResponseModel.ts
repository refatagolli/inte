export interface BaseResponseModel<T> {
  code: string;
  message: string;
  data?: T;
}
