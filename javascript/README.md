# JS MindsDB SDK

## install and build

Commands should executed from `javascript/` folder.

1. install dependencies:
```
yarn
```  
or  
```
npm install
```

2. build:
```
yarn build
```
or
```
npm run build
```

## folder structure

```
./
├── src/        - source code
    ├── index.js       - sdk source code
├── dist/       - builded lib with all dependences (for browser)
├── es/         - builded es6 module
├── lib/        - builded UMD module (can be used in node)
├── rollup.config.js   - build config
├── .babelrc.js        - babel config
├── package.json       - package config
├── ...
```

## usage

example of usage:
```
import MindsDB from 'mindsdb-js-sdk';

//connection
MindsDB.connect(url);
const connected = await MindsDB.ping();
if (!connected) return;

// lists of predictors and datasources
const predictorsList = MindsDB.dataSources();
const predictors = MindsDB.predictors();

// get datasource
const catsDatasorce = await MindsDB.DataSource({name: 'cat'}).load();

// get predictor
const catAgePredictor = await MindsDB.Predictor({name: 'catAge'}).load();

// query
const result = catAgePredictor.queryPredict({color: 'white', weight: '100'});
console.log(result.age);

MindsDB.disconnect();
```
