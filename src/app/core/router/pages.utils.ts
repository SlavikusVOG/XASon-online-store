type Page = {
  name: string;
  link: string;
};

export const createPage = (payload: string[] | Page): Page => {
  if (Array.isArray(payload)) {
    return { name: payload[0], link: '/' + payload.reverse().join('/') };
  }

  return payload;
};
