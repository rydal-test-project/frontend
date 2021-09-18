export type gqPaginatorData = {
  currentPage: 1;
  hasMorePages: true;
  total: 100;
};

export type gqResponseWithPaginate <t> = {
  data: t[],
  paginatorInfo: gqPaginatorData
}

export type defaultResponseData<ResponseData> = ResponseData & {
  data: ResponseData,
  messages: [],
  success: boolean
}