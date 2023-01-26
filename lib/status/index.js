import localStorage from '../utils/saveData';

export const getStatus = async () => {
  try {
    console.log('post', localStorage.getItem('requestCookie'));
    return localStorage.getItem('requestCookie');
  } catch (error) {
    console.log(error);
  }
};
