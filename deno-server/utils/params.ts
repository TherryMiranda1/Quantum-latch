const encodeParam = (data: string, uri: URL, name = "state") => {
  const param = encodeURIComponent(data);

  const redirectUri = new URL(uri.href);
  redirectUri.searchParams.set(name, param);

  return redirectUri;
};

const decodeParam = (url: string) => decodeURIComponent(url);

export const urlUtils = {
  encodeParam,
  decodeParam,
};
