import axios from "axios";

export const connection = {
  url: null,
  api: null,
  token: { key: "apikey", value: null },
  version: 0.2
};

export const connect = (url, params) => {
  connection.token.value = params.find(param => param.key === "apikey").value;
  connection.url = setQueryParams([connection.token], url);
  connection.api = axios.create({
    baseURL: url,
    timeout: 20000
  });
};

export const disconnect = () => {
  connection.url = null;
  connection.token = { key: "apikey", value: null };
  connection.api = null;
};

export const setQueryParams = (paramsObj, url) => {
  let params = "";

  if (paramsObj) {
    paramsObj.forEach((item, i) => {
      if (item.value) {
        const key = encodeURIComponent(item.key);
        const value = encodeURIComponent(item.value);

        const kvp = key + "=" + value;
        params = params.concat(i > 0 ? `&${kvp}` : kvp);
      }
    });

    return params.length > 0 ? url + "?" + params : url;
  }

  return url;
};

export const saveFile = (response, source) => {
  const url = window.URL.createObjectURL(new Blob([response.data]));
  const link = document.createElement("a");
  link.href = url;
  const contentDisposition = response.headers["content-disposition"];
  let fileName = null;
  if (contentDisposition) {
    const fileNameMatch = contentDisposition.match(/filename="?(.+)"?/);
    if (fileNameMatch.length === 2) {
      fileName = fileNameMatch[1];
    }
  }
  if (!fileName && source) {
    let parts = source.split("/");
    let end = parts[parts.length - 1];
    parts = end.split("\\");
    end = parts[parts.length - 1];
    fileName = end;
  }
  fileName = fileName || "unknown";
  link.setAttribute("download", fileName);
  document.body.appendChild(link);
  link.click();
  link.remove();
  window.URL.revokeObjectURL(url);
};
