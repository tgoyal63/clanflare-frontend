export type IBackendResponse<D> = {
  data: D;
  message: string;
  isSuccess: boolean;
};
