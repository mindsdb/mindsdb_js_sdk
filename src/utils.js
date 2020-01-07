export const setQueryParams = (paramsObj, url) => {
  let params = '';

  if(paramsObj) {
    paramsObj.forEach((item, i) => {
      if( item.value) {
        const key = encodeURIComponent(item.key); 
        const value = encodeURIComponent(item.value);
    
        const kvp = key + '=' + value;
        params = params.concat(i > 0  ? `&${kvp}`: kvp);
      }
    });

    if(url.slice(-1) === '/') {
      url = url.substring(0,url.length -1);
    }
    
    return  params.length > 0 ? url + '?' + params : url;
  }

  return url;
};
