export const setQueryParams = (paramsObj, url) => {
  let params = '';

  if(paramsObj) {
    paramsObj.forEach((item, i) => {
      const key = encodeURIComponent(item.key); 
      const value = encodeURIComponent(item.value);
  
      const kvp = key + '=' + value;
      params = params.concat(kvp);
    });
    
    return url + '?' + params;
  }

  return url;
};
