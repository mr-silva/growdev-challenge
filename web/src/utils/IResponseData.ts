export interface IResponseData<TResponse> {
  status: number;
  data: TResponse;
}

export interface IPaginatedListResponse<TResponse> {
  items: TResponse[];
  total: number;
}
