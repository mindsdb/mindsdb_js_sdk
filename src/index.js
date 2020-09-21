/* eslint-disable */
import axios from "axios";
import { setQueryParams } from "./utils";

const connection = {
  url: null,
  api: null,
  token: { key: "apikey", value: null },
  version: 0.2
};

const connect = (url, params) => {
  connection.token.value = params.find(param => param.key === "apikey").value;
  connection.url = setQueryParams([connection.token], url);
  connection.api = axios.create({
    baseURL: url,
    timeout: 20000
  });
};

const disconnect = () => {
  connection.url = null;
  connection.token = { key: "apikey", value: null };
  connection.api = null;
};

const ping = async params => {
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

const saveFile = (response, source) => {
  const url = window.URL.createObjectURL(new Blob([response.data]));
  const link = document.createElement("a");
  link.href = url;
  const contentDisposition = response.headers["content-disposition"];
  let fileName = null;
  if (contentDisposition) {
    const fileNameMatch = contentDisposition.match(/filename="?(.+)"?/);
    if (fileNameMatch.length === 2) {
      fileName = fileNameMatch[1];
    }
  }
  if (!fileName && source) {
    let parts = source.split("/");
    let end = parts[parts.length - 1];
    parts = end.split("\\");
    end = parts[parts.length - 1];
    fileName = end;
  }
  fileName = fileName || "unknown";
  link.setAttribute("download", fileName);
  document.body.appendChild(link);
  link.click();
  link.remove();
  window.URL.revokeObjectURL(url);
};

class Predictor {
  loaded = false;
  name = "";
  version = "";
  is_active = false;
  data_source = "";
  predict = null;
  accuracy = 0;
  status = "";
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

  load = async params => {
    const mergeParams = params
      ? [...params, connection.token]
      : [connection.token];

    let url_path = `/predictors/`;
    if(this.name !== undefined && this.name !==  "" ) {
      url_path += `/${this.name}`
    }

    const request = setQueryParams(mergeParams, url_path);
    const response = await connection.api.get(request);

    Object.assign(this, response.data);
    return this;
  };

  rename = async params => {
    const mergeParams = params
      ? [...params, connection.token]
      : [connection.token];

    const request = setQueryParams(
      mergeParams,
      `/predictors/${params.oldName}/rename?new_name=${params.newName}`
    );
    const response = await connection.api.get(request);

    return response.data;
  };

  loadColumns = async params => {
    const mergeParams = params
      ? [...params, connection.token]
      : [connection.token];

    const request = setQueryParams(
      mergeParams,
      `/predictors/${this.name}/columns`
    );
    const response = await connection.api.get(request);

    this.columns = response.data;
    return this;
  };

  learn = async ({ dataSourceName, fromData, toPredict, kwargs }, params) => {
    const data = {
      to_predict: toPredict
    };

    if (kwargs) {
      data.kwargs = kwargs;
    }

    if (dataSourceName) {
      data.data_source_name = dataSourceName;
    } else if (fromData) {
      data.from_data = fromData;
    }

    const mergeParams = params
      ? [...params, connection.token]
      : [connection.token];
    const request = setQueryParams(mergeParams, `/predictors/${this.name}`);
    const response = await connection.api.put(request, data);

    return response.data;
  };

  queryPredict = async (when, params, format_flag_value) => {
    const mergeParams = params
      ? [...params, connection.token]
      : [connection.token];

    const request = setQueryParams(
      mergeParams,
      `/predictors/${this.name}/predict`
    );
    const response = await connection.api.post(request, { when, format_flag: format_flag_value });

    return response.data;
  };

  delete = async params => {
    const mergeParams = params
      ? [...params, connection.token]
      : [connection.token];

    const request = setQueryParams(mergeParams, `/predictors/${this.name}`);
    await connection.api.delete(request);
  };

  upload = async (file, onProgress, params) => {
    const mergeParams = params
      ? [...params, connection.token]
      : [connection.token];

    const fd = new FormData();
    fd.append("file", file);

    const config = {
      onUploadProgress: progressEvent => {
        if (onProgress) {
          const percentCompleted = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          onProgress(percentCompleted);
        }
      }
    };

    const request = setQueryParams(mergeParams, "/predictors/upload");
    await connection.api.post(request, fd, config);
  };

  download = async params => {
    const mergeParams = params
      ? [...params, connection.token]
      : [connection.token];

    const request = setQueryParams(
      mergeParams,
      `/predictors/${this.name}/download`
    );
    const response = await connection.api.get(request, {
      responseType: "blob"
    });
    saveFile(response);
    return this;
  };

  getDownloadUrl = () => `${connection.url}/predictors/${this.name}/download`;
}

class DataSource {
  loaded = false;

  source_type = "url";

  name = "";
  source = "";
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

  load = async params => {
    const mergeParams = params
      ? [...params, connection.token]
      : [connection.token];

    const request = setQueryParams(mergeParams, `/datasources/${this.name}`);
    const response = await connection.api.get(request);
    Object.assign(this, response.data);
    return this;
  };

  // setSource = () => {};

  upload = async (file, onProgress, params) => {
    this.source_type = "file";
    this.source = file.name;
    const mergeParams = params
      ? [...params, connection.token]
      : [connection.token];

    const fd = new FormData();
    fd.append("name", this.name);
    fd.append("source_type", this.source_type);
    fd.append("source", this.source);
    fd.append("file", file);

    const config = {
      onUploadProgress: progressEvent => {
        if (onProgress) {
          const percentCompleted = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          onProgress(percentCompleted);
        }
      },
      timeout: 600000
    };

    const request = setQueryParams(mergeParams, `/datasources/${this.name}`);
    await connection.api.put(request, fd, config);
  };

  uploadFromUrl = async (url, params) => {
    this.source_type = "url";
    this.source = url;
    const data = {
      name: this.name,
      source_type: this.source_type,
      source: this.source
    };

    const mergeParams = params
      ? [...params, connection.token]
      : [connection.token];
    const request = setQueryParams(mergeParams, `/datasources/${this.name}`);

    await connection.api.put(request, data);
  };

  download = async params => {
    const url = this.getDownloadUrl();
    const mergeParams = params
      ? [...params, connection.token]
      : [connection.token];
    const request = setQueryParams(mergeParams, url);

    const response = await connection.api.get(request, {
      responseType: "blob"
    });
    saveFile(response, this.source);
    return this;
  };

  getDownloadUrl = () =>
    this.source_type === "url"
      ? this.source
      : `${connection.url}/datasources/${this.name}/download`;

  delete = async params => {
    const mergeParams = params
      ? [...params, connection.token]
      : [connection.token];
    const request = setQueryParams(mergeParams, `/datasources/${this.name}`);
    await connection.api.delete(request);
  };

  loadData = async params => {
    const mergeParams = params
      ? [...params, connection.token]
      : [connection.token];
    const request = setQueryParams(
      mergeParams,
      `/datasources/${this.name}/data`
    );
    const response = await connection.api.get(request);

    this.data = response.data;
    return this.data;
  };

  loadDataQuality = async params => {
    const mergeParams = params
      ? [...params, connection.token]
      : [connection.token];
    const request = setQueryParams(
      mergeParams,
      `/datasources/${this.name}/analyze`
    );
    let data;
    try { 
      const response = await connection.api.get(request);
      data = {
        data_analysis_v1: response.data["data_analysis"] ? response.data["data_analysis"]["input_columns_metadata"] : [],
        data_analysis_v2: response.data["data_analysis"] ? response.data["data_analysis_v2"] : [],
        status: response.data && response.data.status
      }; 
    } catch (error) {
      Object.assign(this, {error : error});
      console.error(error)
    }
    this.dataQuality = data;
    return data;
  };

  loadMissedFileList = async params => {
    const mergeParams = params
      ? [...params, connection.token]
      : [connection.token];
    const request = setQueryParams(
      mergeParams,
      `/datasources/${this.name}/missed_files`
    );
    const response = await connection.api.get(request);

    this.missedFileList = response.data;
    return this.missedFileList;
  };

  uploadFile = async ({ column, rowIndex, extension, file }, params) => {
    const fd = new FormData();

    fd.append("file", file);
    fd.append("extension", extension);

    const mergeParams = params
      ? [...params, connection.token]
      : [connection.token];
    const request = setQueryParams(
      mergeParams,
      `/datasources/${this.name}/files/${column}:${rowIndex}`
    );
    const response = await connection.api.put(request, fd);

    return response.status === 200;
  };
}

class DataBase {
  loaded = false;
  source_type = "url";
  integration = [];

  constructor(data) {
    Object.assign(this, data);
  }

  load = async params => {
    const mergeParams = params
      ? [...params, connection.token]
      : [connection.token];
      try {
        const deRequest = setQueryParams(mergeParams, 'config/all_integrations');
        const response = await connection.api.get(deRequest); 
        Object.assign(this, response);
        return this;
      } catch (error) {
        Object.assign(this, {error : error});
        console.error(error)
      }
  };

  delete = async params => {
    await connection.api.delete( `/config/integrations/${params.db_name}`);
  };

  check = async params => {
    return await connection.api.get( `/config/integrations/${params.database_name}/check`);
  };

  edit = async (data, params) => {
    const mergeParams = params
      ? [...params, connection.token]
      : [connection.token];
    const request = setQueryParams(mergeParams, `/config/integrations/${data.params.database_name}`);
    const response = await connection.api.post(request, data);

    return response.data;
  };

  create = async (data, params) => {
    const mergeParams = params
      ? [...params, connection.token]
      : [connection.token];
    const request = setQueryParams(mergeParams, `/config/integrations/${data.params.database_name}`);
    const response = await connection.api.put(request, data);

    return response.data;
  };

  newDataset = async (data, params) => {
    const mergeParams = params
      ? [...params, connection.token]
      : [connection.token];
    try {
      const request = setQueryParams(mergeParams, `/datasources/${data.name}`);
      return await connection.api.put(request, data);
    } catch (error) {
      return error; 
    }
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
  DataBase: database
};

/* eslint-enable */
export default MindsDB;
