import { 
  setQueryParams,
  connection,
  saveFile } from "./utils";

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

export default Predictor;
