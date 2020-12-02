import axios from 'axios';

function _typeof(obj) {
  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    _typeof = function (obj) {
      return typeof obj;
    };
  } else {
    _typeof = function (obj) {
      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    };
  }

  return _typeof(obj);
}

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
  try {
    var info = gen[key](arg);
    var value = info.value;
  } catch (error) {
    reject(error);
    return;
  }

  if (info.done) {
    resolve(value);
  } else {
    Promise.resolve(value).then(_next, _throw);
  }
}

function _asyncToGenerator(fn) {
  return function () {
    var self = this,
        args = arguments;
    return new Promise(function (resolve, reject) {
      var gen = fn.apply(self, args);

      function _next(value) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
      }

      function _throw(err) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
      }

      _next(undefined);
    });
  };
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

function _toConsumableArray(arr) {
  return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread();
}

function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) {
    for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) arr2[i] = arr[i];

    return arr2;
  }
}

function _iterableToArray(iter) {
  if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter);
}

function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance");
}

var setQueryParams = function setQueryParams(paramsObj, url) {
  var params = "";

  if (paramsObj) {
    paramsObj.forEach(function (item, i) {
      if (item.value) {
        var key = encodeURIComponent(item.key);
        var value = encodeURIComponent(item.value);
        var kvp = key + "=" + value;
        params = params.concat(i > 0 ? "&".concat(kvp) : kvp);
      }
    });
    return params.length > 0 ? url + "?" + params : url;
  }

  return url;
};
var saveFile = function saveFile(response, source) {
  var url = window.URL.createObjectURL(new Blob([response.data]));
  var link = document.createElement("a");
  link.href = url;
  var contentDisposition = response.headers["content-disposition"];
  var fileName = null;

  if (contentDisposition) {
    var fileNameMatch = contentDisposition.match(/filename="?(.+)"?/);

    if (fileNameMatch.length === 2) {
      fileName = fileNameMatch[1];
    }
  }

  if (!fileName && source) {
    var parts = source.split("/");
    var end = parts[parts.length - 1];
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

var connection = {
  url: null,
  api: null,
  token: {
    key: "apikey",
    value: null
  },
  version: 0.2
};
var connect = function connect(url, params) {
  connection.token.value = params.find(function (param) {
    return param.key === "apikey";
  }).value;
  connection.url = setQueryParams([connection.token], url);
  connection.api = axios.create({
    baseURL: url,
    timeout: 20000
  });
};
var disconnect = function disconnect() {
  connection.url = null;
  connection.token = {
    key: "apikey",
    value: null
  };
  connection.api = null;
};
var ping =
/*#__PURE__*/
function () {
  var _ref = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee(params) {
    var request, response;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            request = setQueryParams([connection.token], "/util/ping");
            _context.next = 3;
            return connection.api.get(request);

          case 3:
            response = _context.sent;

            if (!(response.status === 200 && _typeof(response.data) === "object" && response.data.status === "ok")) {
              _context.next = 6;
              break;
            }

            return _context.abrupt("return", true);

          case 6:
            return _context.abrupt("return", false);

          case 7:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function ping(_x) {
    return _ref.apply(this, arguments);
  };
}();
var predictors =
/*#__PURE__*/
function () {
  var _ref2 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee2(params) {
    var mergeParams, request, response, rawData, predictorList;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            mergeParams = params ? [].concat(_toConsumableArray(params), [connection.token]) : [connection.token];
            request = setQueryParams(mergeParams, "/predictors/");
            _context2.next = 4;
            return connection.api.get(request);

          case 4:
            response = _context2.sent;
            rawData = response.data || [];
            predictorList = rawData.map(predictor);
            return _context2.abrupt("return", predictorList);

          case 8:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function predictors(_x2) {
    return _ref2.apply(this, arguments);
  };
}();
var dataSources =
/*#__PURE__*/
function () {
  var _ref3 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee3(params) {
    var mergeParams, request, response, rawData, dataSourceList;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            mergeParams = params ? [].concat(_toConsumableArray(params), [connection.token]) : [connection.token];
            request = setQueryParams(mergeParams, "/datasources/");
            _context3.next = 4;
            return connection.api.get(request);

          case 4:
            response = _context3.sent;
            rawData = response.data || [];
            dataSourceList = rawData.map(dataSource);
            return _context3.abrupt("return", dataSourceList);

          case 8:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));

  return function dataSources(_x3) {
    return _ref3.apply(this, arguments);
  };
}();

var DataBase = function DataBase(_data) {
  var _this = this;

  _classCallCheck(this, DataBase);

  _defineProperty(this, "loaded", false);

  _defineProperty(this, "source_type", "url");

  _defineProperty(this, "integration", []);

  _defineProperty(this, "load",
  /*#__PURE__*/
  function () {
    var _ref = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee(params) {
      var mergeParams, deRequest, response;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              mergeParams = params ? [].concat(_toConsumableArray(params), [connection.token]) : [connection.token];
              _context.prev = 1;
              deRequest = setQueryParams(mergeParams, 'config/all_integrations');
              _context.next = 5;
              return connection.api.get(deRequest);

            case 5:
              response = _context.sent;
              Object.assign(_this, response);
              return _context.abrupt("return", _this);

            case 10:
              _context.prev = 10;
              _context.t0 = _context["catch"](1);
              Object.assign(_this, {
                error: _context.t0
              });
              console.error(_context.t0);

            case 14:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, null, [[1, 10]]);
    }));

    return function (_x) {
      return _ref.apply(this, arguments);
    };
  }());

  _defineProperty(this, "delete",
  /*#__PURE__*/
  function () {
    var _ref2 = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee2(params) {
      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.next = 2;
              return connection.api.delete("/config/integrations/".concat(params.db_name));

            case 2:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2);
    }));

    return function (_x2) {
      return _ref2.apply(this, arguments);
    };
  }());

  _defineProperty(this, "check",
  /*#__PURE__*/
  function () {
    var _ref3 = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee3(params) {
      return regeneratorRuntime.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _context3.next = 2;
              return connection.api.get("/config/integrations/".concat(params.database_name, "/check"));

            case 2:
              return _context3.abrupt("return", _context3.sent);

            case 3:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3);
    }));

    return function (_x3) {
      return _ref3.apply(this, arguments);
    };
  }());

  _defineProperty(this, "edit",
  /*#__PURE__*/
  function () {
    var _ref4 = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee4(data, params) {
      var mergeParams, request, response;
      return regeneratorRuntime.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              mergeParams = params ? [].concat(_toConsumableArray(params), [connection.token]) : [connection.token];
              request = setQueryParams(mergeParams, "/config/integrations/".concat(data.params.database_name));
              _context4.next = 4;
              return connection.api.post(request, data);

            case 4:
              response = _context4.sent;
              return _context4.abrupt("return", response.data);

            case 6:
            case "end":
              return _context4.stop();
          }
        }
      }, _callee4);
    }));

    return function (_x4, _x5) {
      return _ref4.apply(this, arguments);
    };
  }());

  _defineProperty(this, "create",
  /*#__PURE__*/
  function () {
    var _ref5 = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee5(data, params) {
      var mergeParams, request, response;
      return regeneratorRuntime.wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              mergeParams = params ? [].concat(_toConsumableArray(params), [connection.token]) : [connection.token];
              request = setQueryParams(mergeParams, "/config/integrations/".concat(data.params.database_name));
              _context5.next = 4;
              return connection.api.put(request, data);

            case 4:
              response = _context5.sent;
              return _context5.abrupt("return", response.data);

            case 6:
            case "end":
              return _context5.stop();
          }
        }
      }, _callee5);
    }));

    return function (_x6, _x7) {
      return _ref5.apply(this, arguments);
    };
  }());

  _defineProperty(this, "newDataset",
  /*#__PURE__*/
  function () {
    var _ref6 = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee6(data, params) {
      var mergeParams, request;
      return regeneratorRuntime.wrap(function _callee6$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              mergeParams = params ? [].concat(_toConsumableArray(params), [connection.token]) : [connection.token];
              _context6.prev = 1;
              request = setQueryParams(mergeParams, "/datasources/".concat(data.name));
              _context6.next = 5;
              return connection.api.put(request, data);

            case 5:
              return _context6.abrupt("return", _context6.sent);

            case 8:
              _context6.prev = 8;
              _context6.t0 = _context6["catch"](1);
              return _context6.abrupt("return", _context6.t0);

            case 11:
            case "end":
              return _context6.stop();
          }
        }
      }, _callee6, null, [[1, 8]]);
    }));

    return function (_x8, _x9) {
      return _ref6.apply(this, arguments);
    };
  }());

  Object.assign(this, _data);
};

var DataSource = function DataSource(_data) {
  var _this = this;

  _classCallCheck(this, DataSource);

  _defineProperty(this, "loaded", false);

  _defineProperty(this, "source_type", "url");

  _defineProperty(this, "name", "");

  _defineProperty(this, "source", "");

  _defineProperty(this, "missed_files", false);

  _defineProperty(this, "created_at", null);

  _defineProperty(this, "updated_at", null);

  _defineProperty(this, "row_count", 0);

  _defineProperty(this, "columns", null);

  _defineProperty(this, "data", null);

  _defineProperty(this, "missedFileList", null);

  _defineProperty(this, "load",
  /*#__PURE__*/
  function () {
    var _ref = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee(params) {
      var mergeParams, request, response;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              mergeParams = params ? [].concat(_toConsumableArray(params), [connection.token]) : [connection.token];
              request = setQueryParams(mergeParams, "/datasources/".concat(_this.name));
              _context.next = 4;
              return connection.api.get(request);

            case 4:
              response = _context.sent;
              Object.assign(_this, response.data);
              return _context.abrupt("return", _this);

            case 7:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));

    return function (_x) {
      return _ref.apply(this, arguments);
    };
  }());

  _defineProperty(this, "upload",
  /*#__PURE__*/
  function () {
    var _ref2 = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee2(file, onProgress, params) {
      var mergeParams, fd, config, request;
      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _this.source_type = "file";
              _this.source = file.name;
              mergeParams = params ? [].concat(_toConsumableArray(params), [connection.token]) : [connection.token];
              fd = new FormData();
              fd.append("name", _this.name);
              fd.append("source_type", _this.source_type);
              fd.append("source", _this.source);
              fd.append("file", file);
              config = {
                onUploadProgress: function onUploadProgress(progressEvent) {
                  if (onProgress) {
                    var percentCompleted = Math.round(progressEvent.loaded * 100 / progressEvent.total);
                    onProgress(percentCompleted);
                  }
                },
                timeout: 600000
              };
              request = setQueryParams(mergeParams, "/datasources/".concat(_this.name));
              _context2.next = 12;
              return connection.api.put(request, fd, config);

            case 12:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2);
    }));

    return function (_x2, _x3, _x4) {
      return _ref2.apply(this, arguments);
    };
  }());

  _defineProperty(this, "uploadFromUrl",
  /*#__PURE__*/
  function () {
    var _ref3 = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee3(url, params) {
      var data, mergeParams, request;
      return regeneratorRuntime.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _this.source_type = "url";
              _this.source = url;
              data = {
                name: _this.name,
                source_type: _this.source_type,
                source: _this.source
              };
              mergeParams = params ? [].concat(_toConsumableArray(params), [connection.token]) : [connection.token];
              request = setQueryParams(mergeParams, "/datasources/".concat(_this.name));
              _context3.next = 7;
              return connection.api.put(request, data);

            case 7:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3);
    }));

    return function (_x5, _x6) {
      return _ref3.apply(this, arguments);
    };
  }());

  _defineProperty(this, "download",
  /*#__PURE__*/
  function () {
    var _ref4 = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee4(params) {
      var url, mergeParams, request, response;
      return regeneratorRuntime.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              url = _this.getDownloadUrl();
              mergeParams = params ? [].concat(_toConsumableArray(params), [connection.token]) : [connection.token];
              request = setQueryParams(mergeParams, url);
              _context4.next = 5;
              return connection.api.get(request, {
                responseType: "blob"
              });

            case 5:
              response = _context4.sent;
              saveFile(response, _this.source);
              return _context4.abrupt("return", _this);

            case 8:
            case "end":
              return _context4.stop();
          }
        }
      }, _callee4);
    }));

    return function (_x7) {
      return _ref4.apply(this, arguments);
    };
  }());

  _defineProperty(this, "getDownloadUrl", function () {
    return _this.source_type === "url" ? _this.source : "".concat(connection.url, "/datasources/").concat(_this.name, "/download");
  });

  _defineProperty(this, "delete",
  /*#__PURE__*/
  function () {
    var _ref5 = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee5(params) {
      var mergeParams, request;
      return regeneratorRuntime.wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              mergeParams = params ? [].concat(_toConsumableArray(params), [connection.token]) : [connection.token];
              request = setQueryParams(mergeParams, "/datasources/".concat(_this.name));
              _context5.next = 4;
              return connection.api.delete(request);

            case 4:
            case "end":
              return _context5.stop();
          }
        }
      }, _callee5);
    }));

    return function (_x8) {
      return _ref5.apply(this, arguments);
    };
  }());

  _defineProperty(this, "loadData",
  /*#__PURE__*/
  function () {
    var _ref6 = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee6(params) {
      var mergeParams, request, response;
      return regeneratorRuntime.wrap(function _callee6$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              mergeParams = params ? [].concat(_toConsumableArray(params), [connection.token]) : [connection.token];
              request = setQueryParams(mergeParams, "/datasources/".concat(_this.name, "/data"));
              _context6.next = 4;
              return connection.api.get(request);

            case 4:
              response = _context6.sent;
              _this.data = response.data;
              return _context6.abrupt("return", _this.data);

            case 7:
            case "end":
              return _context6.stop();
          }
        }
      }, _callee6);
    }));

    return function (_x9) {
      return _ref6.apply(this, arguments);
    };
  }());

  _defineProperty(this, "loadDataQuality",
  /*#__PURE__*/
  function () {
    var _ref7 = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee7(params) {
      var mergeParams, request, data, response;
      return regeneratorRuntime.wrap(function _callee7$(_context7) {
        while (1) {
          switch (_context7.prev = _context7.next) {
            case 0:
              mergeParams = params ? [].concat(_toConsumableArray(params), [connection.token]) : [connection.token];
              request = setQueryParams(mergeParams, "/datasources/".concat(_this.name, "/analyze"));
              _context7.prev = 2;
              _context7.next = 5;
              return connection.api.get(request);

            case 5:
              response = _context7.sent;
              data = {
                data_analysis_v1: response.data["data_analysis"] ? response.data["data_analysis"]["input_columns_metadata"] : [],
                data_analysis_v2: response.data["data_analysis"] ? response.data["data_analysis_v2"] : [],
                status: response.data && response.data.status
              };
              _context7.next = 13;
              break;

            case 9:
              _context7.prev = 9;
              _context7.t0 = _context7["catch"](2);
              Object.assign(_this, {
                error: _context7.t0
              });
              console.error(_context7.t0);

            case 13:
              _this.dataQuality = data;
              return _context7.abrupt("return", data);

            case 15:
            case "end":
              return _context7.stop();
          }
        }
      }, _callee7, null, [[2, 9]]);
    }));

    return function (_x10) {
      return _ref7.apply(this, arguments);
    };
  }());

  _defineProperty(this, "loadMissedFileList",
  /*#__PURE__*/
  function () {
    var _ref8 = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee8(params) {
      var mergeParams, request, response;
      return regeneratorRuntime.wrap(function _callee8$(_context8) {
        while (1) {
          switch (_context8.prev = _context8.next) {
            case 0:
              mergeParams = params ? [].concat(_toConsumableArray(params), [connection.token]) : [connection.token];
              request = setQueryParams(mergeParams, "/datasources/".concat(_this.name, "/missed_files"));
              _context8.next = 4;
              return connection.api.get(request);

            case 4:
              response = _context8.sent;
              _this.missedFileList = response.data;
              return _context8.abrupt("return", _this.missedFileList);

            case 7:
            case "end":
              return _context8.stop();
          }
        }
      }, _callee8);
    }));

    return function (_x11) {
      return _ref8.apply(this, arguments);
    };
  }());

  _defineProperty(this, "uploadFile",
  /*#__PURE__*/
  function () {
    var _ref10 = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee9(_ref9, params) {
      var column, rowIndex, extension, file, fd, mergeParams, request, response;
      return regeneratorRuntime.wrap(function _callee9$(_context9) {
        while (1) {
          switch (_context9.prev = _context9.next) {
            case 0:
              column = _ref9.column, rowIndex = _ref9.rowIndex, extension = _ref9.extension, file = _ref9.file;
              fd = new FormData();
              fd.append("file", file);
              fd.append("extension", extension);
              mergeParams = params ? [].concat(_toConsumableArray(params), [connection.token]) : [connection.token];
              request = setQueryParams(mergeParams, "/datasources/".concat(_this.name, "/files/").concat(column, ":").concat(rowIndex));
              _context9.next = 8;
              return connection.api.put(request, fd);

            case 8:
              response = _context9.sent;
              return _context9.abrupt("return", response.status === 200);

            case 10:
            case "end":
              return _context9.stop();
          }
        }
      }, _callee9);
    }));

    return function (_x12, _x13) {
      return _ref10.apply(this, arguments);
    };
  }());

  Object.assign(this, _data);
};

var Predictor = function Predictor(_data) {
  var _this = this;

  _classCallCheck(this, Predictor);

  _defineProperty(this, "loaded", false);

  _defineProperty(this, "name", "");

  _defineProperty(this, "version", "");

  _defineProperty(this, "is_active", false);

  _defineProperty(this, "data_source", "");

  _defineProperty(this, "predict", null);

  _defineProperty(this, "accuracy", 0);

  _defineProperty(this, "status", "");

  _defineProperty(this, "train_end_at", null);

  _defineProperty(this, "updated_at", null);

  _defineProperty(this, "created_at", null);

  _defineProperty(this, "data_preparation", null);

  _defineProperty(this, "data_analysis", null);

  _defineProperty(this, "model_analysis", null);

  _defineProperty(this, "columns", null);

  _defineProperty(this, "load",
  /*#__PURE__*/
  function () {
    var _ref = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee(params) {
      var mergeParams, url_path, request, response;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              mergeParams = params ? [].concat(_toConsumableArray(params), [connection.token]) : [connection.token];
              url_path = "/predictors/";

              if (_this.name !== undefined && _this.name !== "") {
                url_path += "/".concat(_this.name);
              }

              request = setQueryParams(mergeParams, url_path);
              _context.next = 6;
              return connection.api.get(request);

            case 6:
              response = _context.sent;
              Object.assign(_this, response.data);
              return _context.abrupt("return", _this);

            case 9:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));

    return function (_x) {
      return _ref.apply(this, arguments);
    };
  }());

  _defineProperty(this, "rename",
  /*#__PURE__*/
  function () {
    var _ref2 = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee2(params) {
      var mergeParams, request, response;
      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              mergeParams = params ? [].concat(_toConsumableArray(params), [connection.token]) : [connection.token];
              request = setQueryParams(mergeParams, "/predictors/".concat(params.oldName, "/rename?new_name=").concat(params.newName));
              _context2.next = 4;
              return connection.api.get(request);

            case 4:
              response = _context2.sent;
              return _context2.abrupt("return", response.data);

            case 6:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2);
    }));

    return function (_x2) {
      return _ref2.apply(this, arguments);
    };
  }());

  _defineProperty(this, "loadColumns",
  /*#__PURE__*/
  function () {
    var _ref3 = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee3(params) {
      var mergeParams, request, response;
      return regeneratorRuntime.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              mergeParams = params ? [].concat(_toConsumableArray(params), [connection.token]) : [connection.token];
              request = setQueryParams(mergeParams, "/predictors/".concat(_this.name, "/columns"));
              _context3.next = 4;
              return connection.api.get(request);

            case 4:
              response = _context3.sent;
              _this.columns = response.data;
              return _context3.abrupt("return", _this);

            case 7:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3);
    }));

    return function (_x3) {
      return _ref3.apply(this, arguments);
    };
  }());

  _defineProperty(this, "learn",
  /*#__PURE__*/
  function () {
    var _ref5 = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee4(_ref4, params) {
      var dataSourceName, fromData, toPredict, kwargs, data, mergeParams, request, response;
      return regeneratorRuntime.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              dataSourceName = _ref4.dataSourceName, fromData = _ref4.fromData, toPredict = _ref4.toPredict, kwargs = _ref4.kwargs;
              data = {
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

              mergeParams = params ? [].concat(_toConsumableArray(params), [connection.token]) : [connection.token];
              request = setQueryParams(mergeParams, "/predictors/".concat(_this.name));
              _context4.next = 8;
              return connection.api.put(request, data);

            case 8:
              response = _context4.sent;
              return _context4.abrupt("return", response.data);

            case 10:
            case "end":
              return _context4.stop();
          }
        }
      }, _callee4);
    }));

    return function (_x4, _x5) {
      return _ref5.apply(this, arguments);
    };
  }());

  _defineProperty(this, "queryPredict",
  /*#__PURE__*/
  function () {
    var _ref6 = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee5(when, params, format_flag_value) {
      var mergeParams, request, response;
      return regeneratorRuntime.wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              mergeParams = params ? [].concat(_toConsumableArray(params), [connection.token]) : [connection.token];
              request = setQueryParams(mergeParams, "/predictors/".concat(_this.name, "/predict"));
              _context5.next = 4;
              return connection.api.post(request, {
                when: when,
                format_flag: format_flag_value
              });

            case 4:
              response = _context5.sent;
              return _context5.abrupt("return", response.data);

            case 6:
            case "end":
              return _context5.stop();
          }
        }
      }, _callee5);
    }));

    return function (_x6, _x7, _x8) {
      return _ref6.apply(this, arguments);
    };
  }());

  _defineProperty(this, "delete",
  /*#__PURE__*/
  function () {
    var _ref7 = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee6(params) {
      var mergeParams, request;
      return regeneratorRuntime.wrap(function _callee6$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              mergeParams = params ? [].concat(_toConsumableArray(params), [connection.token]) : [connection.token];
              request = setQueryParams(mergeParams, "/predictors/".concat(_this.name));
              _context6.next = 4;
              return connection.api.delete(request);

            case 4:
            case "end":
              return _context6.stop();
          }
        }
      }, _callee6);
    }));

    return function (_x9) {
      return _ref7.apply(this, arguments);
    };
  }());

  _defineProperty(this, "upload",
  /*#__PURE__*/
  function () {
    var _ref8 = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee7(file, onProgress, params) {
      var mergeParams, fd, config, request;
      return regeneratorRuntime.wrap(function _callee7$(_context7) {
        while (1) {
          switch (_context7.prev = _context7.next) {
            case 0:
              mergeParams = params ? [].concat(_toConsumableArray(params), [connection.token]) : [connection.token];
              fd = new FormData();
              fd.append("file", file);
              config = {
                onUploadProgress: function onUploadProgress(progressEvent) {
                  if (onProgress) {
                    var percentCompleted = Math.round(progressEvent.loaded * 100 / progressEvent.total);
                    onProgress(percentCompleted);
                  }
                }
              };
              request = setQueryParams(mergeParams, "/predictors/upload");
              _context7.next = 7;
              return connection.api.post(request, fd, config);

            case 7:
            case "end":
              return _context7.stop();
          }
        }
      }, _callee7);
    }));

    return function (_x10, _x11, _x12) {
      return _ref8.apply(this, arguments);
    };
  }());

  _defineProperty(this, "download",
  /*#__PURE__*/
  function () {
    var _ref9 = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee8(params) {
      var mergeParams, request, response;
      return regeneratorRuntime.wrap(function _callee8$(_context8) {
        while (1) {
          switch (_context8.prev = _context8.next) {
            case 0:
              mergeParams = params ? [].concat(_toConsumableArray(params), [connection.token]) : [connection.token];
              request = setQueryParams(mergeParams, "/predictors/".concat(_this.name, "/download"));
              _context8.next = 4;
              return connection.api.get(request, {
                responseType: "blob"
              });

            case 4:
              response = _context8.sent;
              saveFile(response);
              return _context8.abrupt("return", _this);

            case 7:
            case "end":
              return _context8.stop();
          }
        }
      }, _callee8);
    }));

    return function (_x13) {
      return _ref9.apply(this, arguments);
    };
  }());

  _defineProperty(this, "getDownloadUrl", function () {
    return "".concat(connection.url, "/predictors/").concat(_this.name, "/download");
  });

  Object.assign(this, _data);
};

var predictor$1 = function predictor(opts) {
  return new Predictor(opts);
};

var dataSource$1 = function dataSource(opts) {
  return new DataSource(opts);
};

var database = function database(opts) {
  return new DataBase(opts);
};

var MindsDB = {
  connect: connect,
  disconnect: disconnect,
  ping: ping,
  predictors: predictors,
  dataSources: dataSources,
  DataSource: dataSource$1,
  Predictor: predictor$1,
  DataBase: database
};

export default MindsDB;
