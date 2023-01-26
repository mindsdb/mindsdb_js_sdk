import axios from 'axios';
import localStorage from 'localStorage';

export const connect = async (userData, env = 'https://alpha.mindsdb.com') => {

  const { email, password } = userData;
  if (!email || !password) {
    return {
      error: true,
      message: 'Please add email or password',
    };
  }

  try {
    const loginResponse = await axios.post(`${env}/cloud/login`, userData);
    const requestCookie = loginResponse.headers['set-cookie'];
    const statusResponse = await axios.get(`${env}/cloud/status`, {
      headers: {
        Cookie: requestCookie,
      },
    });

    localStorage.setItem('auth', JSON.stringify(loginResponse.data));
    localStorage.setItem('requestCookie', requestCookie[4]);

    // console.log(
    //     JSON.stringify({
    //         Cookie: requestCookie,
    //     })
    // );
    return statusResponse.data;
  } catch (error) {
    console.log(error);
  }

  // const loginResponse = await axios
  //     .post(`${env}/cloud/login`, userData)

  //     .then((response) => {
  //         localStorage.setItem("auth", JSON.stringify(response.data));
  //         console.log("loginResponse =>", response);
  //         console.log("pos", localStorage.getItem("auth"));
  //         return response.data;
  //     })
  //     .catch((err) => {
  //         console.log(JSON.stringify(err)); // Error handler
  //     });

  // return await axios
  //     .get(`${env}/cloud/status`, {
  //         withCredentials: true,
  //     })
  //     .then((response) => {
  //         console.log("pos", localStorage.getItem("auth"));
  //         return response;
  //     })
  //     .catch((err) => {
  //         console.log(JSON.stringify(err)); // Error handler
  //     });
};
