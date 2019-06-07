/* eslint-disable */
import axios from 'axios';

const connection = {
  url: null,
  api: null,
  version: 0.1
};

const connect = (url) => {
  connection.url = url;
  connection.api = axios.create({
    baseURL: url,
    timeout: 20000,
  });
};

const disconnect = () => {
  connection.url = null;
  connection.token = null;
  connection.api = null;
};

const ping = async () => {
  const response = await connection.api.get('/util/ping');
  if (
    response.status === 200
    && typeof response.data === 'object'
    && response.data.status === 'ok'
  ) return true;
  return false;
};

const predictor = (opts) => new Predictor(opts);
const dataSource = (opts) => new DataSource(opts);

const predictors = async () => {
  const response = await connection.api.get('/predictors/');
  const rawData = response.data || [];
  const predictorList = rawData.map(predictor);
  return predictorList;
};

const dataSources = async () => {
  const response = await connection.api.get('/datasources/');
  const rawData = response.data || [];
  const dataSourceList = rawData.map(dataSource);
  return dataSourceList;
};

const saveFile = (response, source) => {
  const url = window.URL.createObjectURL(new Blob([response.data]));
  const link = document.createElement('a');
  link.href = url;
  const contentDisposition = response.headers['content-disposition'];
  let fileName = null;
  if (contentDisposition) {
    const fileNameMatch = contentDisposition.match(/filename="?(.+)"?/);
    if (fileNameMatch.length === 2) {
      fileName = fileNameMatch[1];
    }
  }
  if (!fileName && source) {
    let parts = source.split('/');
    let end = parts[parts.length - 1];
    parts = end.split('\\');
    end = parts[parts.length - 1];
    fileName = end;
  }
  fileName = fileName || 'unknown';
  link.setAttribute('download', fileName);
  document.body.appendChild(link);
  link.click();
  link.remove();
  window.URL.revokeObjectURL(url);
};

class Predictor {
  loaded = false;
  name = '';
  version = '';
  is_active = false;
  data_source = '';
  predict = null;
  accuracy = 0;
  status = '';
  train_end_at = null;
  updated_at = null;
  created_at = null;

  data_preparation = null;
  data_analysis = null;
  model_analysis = null;

  columns = null;

  constructor(data) {
    Object.assign(this, data);
  }

  load = async () => {
    const response = await connection.api.get(`/predictors/${this.name}`);
    Object.assign(this, response.data);
    return this;
  };

  loadColumns = async () => {
    const response = await connection.api.get(`/predictors/${this.name}/columns`);
    this.columns = response.data;
    return this;
  };

  learn = async ({ dataSourceName, fromData, toPredict }) => {
    const data = {
      to_predict: toPredict,
    };
    if (dataSourceName) {
      data.data_source_name = dataSourceName;
    } else if (fromData) {
      data.from_data = fromData;
    }
    const response = await connection.api.put(`/predictors/${this.name}`, data);
    return response.data;
  };

  queryPredict = async (when) => {
    const response = await connection.api.post(`/predictors/${this.name}/predict`, { when });
    return response.data;
  };

  delete = async () => {
    await connection.api.delete(`/predictors/${this.name}`);
  };

  upload = async (file, onProgress) => {
    const fd = new FormData();
    fd.append('file', file);

    const config = {
      onUploadProgress: (progressEvent) => {
        if (onProgress) {
          const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          onProgress(percentCompleted);
        }
      }
    };

    await connection.api.post('/predictors/upload', fd, config);
  };

  download = async () => {
    const response = await connection.api.get(`/predictors/${this.name}/download`, {
      responseType: 'blob',
    });
    saveFile(response);
    return this;
  };

  getDownloadUrl = () => `${connection.url}/predictors/${this.name}/download`;
}

class DataSource {
  loaded = false;

  source_type = 'url';

  name = '';
  source = '';
  missed_files = false;
  created_at = null;
  updated_at = null;
  row_count = 0;
  columns = null;

  data = null;
  missedFileList = null;

  constructor(data) {
    Object.assign(this, data);
  }

  load = async () => {
    const response = await connection.api.get(`/datasources/${this.name}`);
    Object.assign(this, response.data);
    return this;
  };

  // setSource = () => {};

  upload = async (file, onProgress) => {
    this.source_type = 'file';
    this.source = file.name;

    const fd = new FormData();
    fd.append('name', this.name);
    fd.append('source_type', this.source_type);
    fd.append('source', this.source);
    fd.append('file', file);

    const config = {
      onUploadProgress: (progressEvent) => {
        if (onProgress) {
          const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          onProgress(percentCompleted);
        }
      }
    };

    await connection.api.put(`/datasources/${this.name}`, fd, config);
  };

  uploadFromUrl = async (url) => {
    this.source_type = 'url';
    this.source = url;
    const data = {
      name: this.name,
      source_type: this.source_type,
      source: this.source,
    };
    await connection.api.put(`/datasources/${this.name}`, data);
  };

  download = async () => {
    const url = this.getDownloadUrl();
    const response = await connection.api.get(url, {
      responseType: 'blob',
    });
    saveFile(response, this.source);
    return this;
  };

  getDownloadUrl = () => this.source_type === 'url' ? this.source : `${connection.url}/datasources/${this.name}/download`

  delete = async () => {
    await connection.api.delete(`/datasources/${this.name}`);
  };

  loadData = async () => {
    const response = await connection.api.get(`/datasources/${this.name}/data`);
    this.data = response.data;
    return this.data;
  };

  loadMissedFileList = async () => {
    const response = await connection.api.get(`/datasources/${this.name}/missed_files`);
    this.missedFileList = response.data;
    return this.missedFileList;
  };

  uploadFile = async ({
    column, rowIndex, extension, file
  }) => {
    const fd = new FormData();
    fd.append('file', file);
    fd.append('extension', extension);
    const response = await connection.api.put(`/datasources/${this.name}/files/${column}:${rowIndex}`, fd);
    return response.status === 200;
  };
}

const MindsDB = {
  connect,
  disconnect,
  ping,
  predictors,
  dataSources,
  DataSource: dataSource,
  Predictor: predictor,
};

/* eslint-enable */
export default MindsDB;
