import localStorage from 'localStorage';

export const getStatus = async () => {
    try {
        console.log('post', localStorage.getItem('requestCookie'));
        return localStorage.getItem('requestCookie');
    } catch (error) {
        console.log(error);
    }
};
