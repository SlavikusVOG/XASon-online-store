export type HttpParams = Record<string, string | number | boolean>;
export type HttpQueries = Record<string, string | number | boolean>;
export type HttpBody = unknown;

type RequestConfig = {
  Q?: HttpQueries;
  B?: HttpBody;
};

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export type GetRequest<T extends RequestConfig = {}> = {
  params?: HttpParams;
  queries?: T['Q'] extends HttpQueries ? T['Q'] : HttpQueries;
};

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export type PostRequest<T extends RequestConfig = {}> = {
  params?: HttpParams;
  queries?: T['Q'] extends HttpQueries ? T['Q'] : HttpQueries;
  body?: T['B'] extends HttpBody ? T['B'] : HttpBody;
};

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export type PatchRequest<T extends RequestConfig = {}> = {
  params?: HttpParams;
  queries?: T['Q'] extends HttpQueries ? T['Q'] : HttpQueries;
  body?: T['B'] extends HttpBody ? T['B'] : HttpBody;
};

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export type PutRequest<T extends RequestConfig = {}> = {
  params?: HttpParams;
  queries?: T['Q'] extends HttpQueries ? T['Q'] : HttpQueries;
  body?: T['B'] extends HttpBody ? T['B'] : HttpBody;
};

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export type DeleteRequest<T extends RequestConfig = {}> = {
  params?: HttpParams;
  queries?: T['Q'] extends HttpQueries ? T['Q'] : HttpQueries;
};
