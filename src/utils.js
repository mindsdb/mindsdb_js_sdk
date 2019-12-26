export const setQueryParams = (paramsObj, url) => {
  let params = '';

  if(paramsObj && paramsObj.value) {
    paramsObj.forEach((item, i) => {
      const key = encodeURIComponent(item.key); 
      const value = encodeURIComponent(item.value);
  
      const kvp = key + '=' + value;
      params = params.concat(kvp);
    });

    if(url.slice(-1) === '/') {
      url = arr.substring(0,arr.length -1);
    }
    
    return url + '?' + params;
  }

  return url;
};
