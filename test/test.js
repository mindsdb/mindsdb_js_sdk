const mindsdbsdk = require("../src/index");

const test = async () => {
    const result = await mindsdbsdk.connect();
    const predictor = MindsDB.Predictor();
    console.log('==>',result, predictor);
};

test();