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

## Documentation

### root methods

### `MindsDB.connect(url)`
Initialize connection to MindsDV server

**params**
  * url *string* - server url

**returns** undefined

### `MindsDB.disconnect()`
Clear connection data

**returns** undefined

### `async MindsDB.ping()`
Check connection

**returns** bool

### `async MindsDB.predictors()`
return list of existing predictors
**returns** [{PredictorObject}, ...]

### `async MindsDB.dataSources()`
return list of existing datasources
**returns** [{DatasourceObject}, ...]

### `MindsDB.DataSource(opts = { name })`
return datasource object
**params**
  * opts *object*
    * name *string* datasource name

**returns** {DataSourceObject}

### `MindsDB.Predictor(opts = { name })`
return predictor object
**params**
  * opts *object*
    * name *string* predictor name

**returns** {PredictorObject}

### DataSourceObject methods

### `async DataSourceObject.load()`
load data for this dataSource

**returns** {DataSourceObject} this object

### `async DataSourceObject.upload(file, onProgress)`
upload datasource-file to server
**params**
  * file *object*
  * onProgress *function*

**returns** undefined

### `async DataSourceObject.uploadFromUrl(url)`
upload datasource to server, by url
**params**
  * url *string*

**returns** undefined

### `async DataSourceObject.download()`
initiate datasource downloading

**returns** {DataSourceObject} this object

### `async DataSourceObject.getDownloadUrl()`
**returns** string download datasource url

### `async DataSourceObject.delete()`
delete datasource
**returns** undefined

### `async DataSourceObject.loadData()`
get datasource rows

**returns** [{rows}, ...] data rows

### `async DataSourceObject.loadMissedFileList()`
get list of missed files for datasource

**returns** [{rows}, ...]

### `async DataSourceObject.uploadFile(opts = { column, rowIndex, extension, file })`
**params**
  * opts *object*
    * column *string*
    * rowIndex *string*
    * extension *string*
    * file *object*

**returns** bool - successful

### `PredictorObject methods`

### `async PredictorObject.load()`
load data for this predictor

**returns** {PredictorObject} this object

### `async PredictorObject.loadColumns()`
load information about columns used for make predictor. After loading columns will be available at this.columns

**returns** {PredictorObject} this object

### `async PredictorObject.learn(opts = { dataSourceName, fromData, toPredict })`

**params**
  * opts *object*
    * dataSourceName *string* name of datasource
    * fromData *string* Optional url to a file that you want to learn from
    * toPredict *[string]* list of column names to predict

**returns** string empty string

### `async PredictorObject.queryPredict(when)`
query to predictor

**params**
  * when *object* key-value for query fields, example:
> when: {sqft: "1000", location: "good"}

**returns** object key-value for query and predicted foelds

### `async PredictorObject.delete()`
delete predictor

**returns** undefined

### `async PredictorObject.upload(file, onProgress)`
upload predictor to server

**params**
  * file *object*
  * onProgress *function*

**returns** undefined

### `async PredictorObject.download()`
initiate predictor downloading

**returns** {PredictorObject} this object

### `async PredictorObject.getDownloadUrl()`
**returns** string download predictor url