module.exports = async function getStatus() {
    let localStorage = require("../utils/saveData");
    try {
        console.log("pos", localStorage.getItem("requestCookie"));
    return localStorage.getItem("requestCookie");
    } catch (error) {
        console.log(error)
    }
    
};
