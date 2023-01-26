import axios from 'axios';
import localStorage from 'localStorage';

export const setQuery = async (query = '') => {
  const queryRequest = {
    query,
    context: {
      db: 'mindsdb',
    },
  };

  try {
    const requestCookie = localStorage.getItem('requestCookie');
    // console.log("pos", localStorage.getItem("requestCookie"));
    const getFilesResponse = await axios.post(`/api/sql/query`, queryRequest, {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': '*',
        'Access-Control-Allow-Credentials': 'true',
        Cookie: requestCookie,
      },
    });
    // console.log(getFilesResponse)

    return getFilesResponse.data;
  } catch (error) {
    console.log(error);
  }
};
