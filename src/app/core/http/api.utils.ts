import { isPresent } from '../../shared/utils/is-present.util';
import { HttpParams, HttpQueries } from './api.types';

export const buildUrl = (
  url: string,
  params: HttpParams | undefined,
  queries: HttpQueries | undefined,
): string => {
  if (params) {
    url = insertParams(url, params);
  }

  if (queries) {
    url += `?${createQueries(queries)}`;
  }

  return url;
};

const insertParams = (url: string, params: HttpParams): string => {
  let resultUrl: string = url;
  for (const key in params) {
    if (key in params && isPresent(params[key])) {
      resultUrl = resultUrl.replace(`{{${key}}}`, encodeURIComponent(params[key]));
    } else {
      resultUrl = resultUrl.replace(new RegExp(`&?${key}={{${key}}}`), '');
    }
  }
  return resultUrl;
};

const createQueries = (queries: HttpQueries): string => {
  return Object.keys(queries)
    .map((key) => `${key}=${encodeURIComponent(queries[key])}`)
    .join('&');
};
