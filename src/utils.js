export const setQueryParams = (paramsObj, url) => {
  let params = '';

  if(paramsObj) {
    paramsObj.forEach((item, i) => {
      if( item.value) {
        const key = encodeURIComponent(item.key); 
        const value = encodeURIComponent(item.value);
    
        const kvp = key + '=' + value;
        params = params.concat(kvp);
      }
    });

    if(url.slice(-1) === '/') {
      url = url.substring(0,url.length -1);
    }
    
    return url + `${i >0 ? '&' : '?'}` + params;
  }

  return url;
};
