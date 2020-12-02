import { setQueryParams, saveFile } from '../utils';
import { connection } from './commons';

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

  load = async (params) => {
    const mergeParams = params
      ? [...params, connection.token]
      : [connection.token];

    const request = setQueryParams(mergeParams, `/datasources/${this.name}`);
    const response = await connection.api.get(request);
    Object.assign(this, response.data);
    return this;
  };

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

  download = async (params) => {
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

  delete = async (params) => {
    const mergeParams = params
      ? [...params, connection.token]
      : [connection.token];
    const request = setQueryParams(mergeParams, `/datasources/${this.name}`);
    await connection.api.delete(request);
  };

  loadData = async (params) => {
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

  loadDataQuality = async (params) => {
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

  loadMissedFileList = async (params) => {
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

export default DataSource;
