import DataBase from './modules/database';
import DataSource from './modules/dataSource';
import Predictor from './modules/predictor';

import { 
  dataSources,
  predictors,
  connect,
  disconnect, ping } from './modules/commons';

const predictor = opts => new Predictor(opts);
const dataSource = opts => new DataSource(opts);
const database = opts => new DataBase(opts);


const MindsDB = {
  connect,
  disconnect,
  ping,
  predictors,
  dataSources,
  DataSource: dataSource,
  Predictor: predictor,
  DataBase: database
};

export default MindsDB;
