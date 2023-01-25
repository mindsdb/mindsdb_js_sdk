module.exports = async function getFiles() {
    let localStorage = require("../utils/saveData");
    const axios = require("axios");
    const env = "https://alpha.mindsdb.com";
    const queryRequest = {
        query: "SHOW TABLES FROM files;",
        context: {
            db: "mindsdb",
        },
    };
    try {
        const requestCookie = localStorage.getItem("requestCookie");
        // console.log("pos", localStorage.getItem("requestCookie"));
        const getFilesResponse = await axios.post(`${env}/api/sql/query`, queryRequest, {
            withCredentials: true,
            headers: {
                Cookie: requestCookie,
            },
        });
        // console.log(getFilesResponse)

        return getFilesResponse.data;
    } catch (error) {
        console.log(error);
    }
};