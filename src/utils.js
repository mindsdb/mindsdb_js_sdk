export const setQueryParams = (paramsObj, url) => {
  let params = "";

  if (paramsObj) {
    paramsObj.forEach((item, i) => {
      if (item.value) {
        const key = encodeURIComponent(item.key);
        const value = !item.noEncodeURIComponent ?
          encodeURIComponent(item.value) : item.value;

        const kvp = key + "=" + value;
        params = params.concat(i > 0 ? `&${kvp}` : kvp);
      }
    });

    return params.length > 0 ? url + "?" + params : url;
  }

  return url;
};
