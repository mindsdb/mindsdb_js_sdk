export const setQueryParams = (paramsObj, url) => {
  let params = '';

  if(paramsObj) {
    paramsObj.forEach((item, i) => {
      const key = encodeURIComponent(item.key); 
      const value = encodeURIComponent(item.value);
  
      const s = url;
      const kvp = key + '=' + value;
      const r = new RegExp('(&|\\?)'+key+'=[^\&]*');
  
      s = s.replace(r, '$1' + kvp);
  
      if(!RegExp.$1) {
        s += (i != 0 ? '&' : '?') + kvp;
      }
       params = params.concat(s);
    });
    
    return params;
  }

  return url;
};
