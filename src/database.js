import { setQueryParams, connection} from "./utils";

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

export default DataBase;
