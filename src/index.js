/* eslint-disable */
import DataBase from './database';
import DataSource from './dataSource';
import Predictor from './predictor';

import { 
  setQueryParams,
  connection,
  connect,
  disconnect } from "./utils";

const ping = async (params) => {
  const request = setQueryParams([connection.token], "/util/ping");
  const response = await connection.api.get(request);

  if (
    response.status === 200 &&
    typeof response.data === "object" &&
    response.data.status === "ok"
  ) {
    return true;
  }
  return false;
};

const predictor = opts => new Predictor(opts);
const dataSource = opts => new DataSource(opts);
const database = opts => new DataBase(opts);

const predictors = async params => {
  const mergeParams = params
    ? [...params, connection.token]
    : [connection.token];

  const request = setQueryParams(mergeParams, "/predictors/");
  const response = await connection.api.get(request);

  const rawData = response.data || [];
  const predictorList = rawData.map(predictor);
  return predictorList;
};

const dataSources = async params => {
  const mergeParams = params
    ? [...params, connection.token]
    : [connection.token];

  const request = setQueryParams(mergeParams, "/datasources/");
  const response = await connection.api.get(request);

  const rawData = response.data || [];
  const dataSourceList = rawData.map(dataSource);
  return dataSourceList;
};

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
