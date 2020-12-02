import axios from 'axios';
import { setQueryParams } from '../utils';

export const connection = {
  url: null,
  api: null,
  token: { key: "apikey", value: null },
  version: 0.2
};

export const connect = (url, params) => {
  connection.token.value = params.find(param => param.key === "apikey").value;
  connection.url = setQueryParams([connection.token], url);
  connection.api = axios.create({
    baseURL: url,
    timeout: 20000
  });
};

export const disconnect = () => {
  connection.url = null;
  connection.token = { key: "apikey", value: null };
  connection.api = null;
};

export const ping = async (params) => {
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

export const predictors = async (params) => {
  const mergeParams = params
    ? [...params, connection.token]
    : [connection.token];

  const request = setQueryParams(mergeParams, "/predictors/");
  const response = await connection.api.get(request);

  const rawData = response.data || [];
  const predictorList = rawData.map(predictor);
  return predictorList;
};

export const dataSources = async (params) => {
  const mergeParams = params
    ? [...params, connection.token]
    : [connection.token];

  const request = setQueryParams(mergeParams, "/datasources/");
  const response = await connection.api.get(request);

  const rawData = response.data || [];
  const dataSourceList = rawData.map(dataSource);
  return dataSourceList;
};
