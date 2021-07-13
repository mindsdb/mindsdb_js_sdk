'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var _classCallCheck = _interopDefault(require('@babel/runtime/helpers/classCallCheck'));
var _defineProperty = _interopDefault(require('@babel/runtime/helpers/defineProperty'));
var _toConsumableArray = _interopDefault(require('@babel/runtime/helpers/toConsumableArray'));
var _regeneratorRuntime = _interopDefault(require('@babel/runtime/regenerator'));
var _typeof = _interopDefault(require('@babel/runtime/helpers/typeof'));
var _asyncToGenerator = _interopDefault(require('@babel/runtime/helpers/asyncToGenerator'));
var axios = _interopDefault(require('axios'));

var setQueryParams = function setQueryParams(paramsObj, url) {
  var params = "";

  if (paramsObj) {
    paramsObj.forEach(function (item, i) {
      if (item.value) {
        var key = encodeURIComponent(item.key);
        var value = !item.noEncodeURIComponent ? encodeURIComponent(item.value) : item.value;
        var kvp = key + "=" + value;
        params = params.concat(i > 0 ? "&".concat(kvp) : kvp);
      }
    });
    return params.length > 0 ? url + "?" + params : url;
  }

  return url;
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
    baseURL: url
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

var ping = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee(params) {
    var request, response;
    return _regeneratorRuntime.wrap(function _callee$(_context) {
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

var logs = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee2(params) {
    var request, response;
    return _regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            request = setQueryParams([].concat(_toConsumableArray(params), [connection.token]), "/config/logs");
            _context2.next = 3;
            return connection.api.get(request);

          case 3:
            response = _context2.sent;
            return _context2.abrupt("return", response.data);

          case 5:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function logs(_x2) {
    return _ref2.apply(this, arguments);
  };
}();

var dependencies = /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee3() {
    var request, response;
    return _regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            request = setQueryParams([connection.token], "/config/install_options");
            _context3.next = 3;
            return connection.api.get(request);

          case 3:
            response = _context3.sent;
            return _context3.abrupt("return", response.data);

          case 5:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));

  return function dependencies() {
    return _ref3.apply(this, arguments);
  };
}();

var getEnvs = /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee4() {
    var request, response;
    return _regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            request = setQueryParams([connection.token], "/config/vars");
            _context4.next = 3;
            return connection.api.get(request);

          case 3:
            response = _context4.sent;
            return _context4.abrupt("return", response.data);

          case 5:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  }));

  return function getEnvs() {
    return _ref4.apply(this, arguments);
  };
}();

var uppdateVar = /*#__PURE__*/function () {
  var _ref5 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee5(env, status) {
    var request, response;
    return _regeneratorRuntime.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            request = setQueryParams([connection.token], "/config/".concat(env, "/").concat(status));
            _context5.next = 3;
            return connection.api.get(request);

          case 3:
            response = _context5.sent;
            return _context5.abrupt("return", response.data);

          case 5:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5);
  }));

  return function uppdateVar(_x3, _x4) {
    return _ref5.apply(this, arguments);
  };
}();

var installDependencies = /*#__PURE__*/function () {
  var _ref6 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee6(name) {
    var request, response;
    return _regeneratorRuntime.wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            request = setQueryParams([connection.token], "/config/install/".concat(name));
            _context6.next = 3;
            return connection.api.get(request);

          case 3:
            response = _context6.sent;
            return _context6.abrupt("return", response);

          case 5:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6);
  }));

  return function installDependencies(_x5) {
    return _ref6.apply(this, arguments);
  };
}();

var predictor = function predictor(opts) {
  return new Predictor(opts);
};

var dataSource = function dataSource(opts) {
  return new DataSource(opts);
};

var database = function database(opts) {
  return new DataBase(opts);
};

var predictors = /*#__PURE__*/function () {
  var _ref7 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee7(params) {
    var mergeParams, request, response, rawData, predictorList;
    return _regeneratorRuntime.wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            mergeParams = params ? [].concat(_toConsumableArray(params), [connection.token]) : [connection.token];
            request = setQueryParams(mergeParams, "/predictors/");
            _context7.next = 4;
            return connection.api.get(request);

          case 4:
            response = _context7.sent;
            rawData = response.data || [];
            predictorList = rawData.map(predictor);
            return _context7.abrupt("return", predictorList);

          case 8:
          case "end":
            return _context7.stop();
        }
      }
    }, _callee7);
  }));

  return function predictors(_x6) {
    return _ref7.apply(this, arguments);
  };
}();

var dataSources = /*#__PURE__*/function () {
  var _ref8 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee8(params) {
    var mergeParams, request, response, rawData, dataSourceList;
    return _regeneratorRuntime.wrap(function _callee8$(_context8) {
      while (1) {
        switch (_context8.prev = _context8.next) {
          case 0:
            mergeParams = params ? [].concat(_toConsumableArray(params), [connection.token]) : [connection.token];
            request = setQueryParams(mergeParams, "/datasources/");
            _context8.next = 4;
            return connection.api.get(request);

          case 4:
            response = _context8.sent;
            rawData = response.data || [];
            dataSourceList = rawData.map(dataSource);
            return _context8.abrupt("return", dataSourceList);

          case 8:
          case "end":
            return _context8.stop();
        }
      }
    }, _callee8);
  }));

  return function dataSources(_x7) {
    return _ref8.apply(this, arguments);
  };
}();

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

  _defineProperty(this, "code_from_json_ai", /*#__PURE__*/function () {
    var _ref9 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee9(params) {
      var mergeParams, request;
      return _regeneratorRuntime.wrap(function _callee9$(_context9) {
        while (1) {
          switch (_context9.prev = _context9.next) {
            case 0:
              mergeParams = params ? [].concat(_toConsumableArray(params), [connection.token]) : [connection.token];
              request = setQueryParams(mergeParams, "/predictors/code_from_json_ai/".concat(_this.name));
              _context9.next = 4;
              return connection.api.get(request);

            case 4:
              return _context9.abrupt("return", response.data);

            case 5:
            case "end":
              return _context9.stop();
          }
        }
      }, _callee9);
    }));

    return function (_x8) {
      return _ref9.apply(this, arguments);
    };
  }());

  _defineProperty(this, "jsonAI_edit", /*#__PURE__*/function () {
    var _ref10 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee10(params) {
      var mergeParams, request;
      return _regeneratorRuntime.wrap(function _callee10$(_context10) {
        while (1) {
          switch (_context10.prev = _context10.next) {
            case 0:
              mergeParams = params ? [].concat(_toConsumableArray(params), [connection.token]) : [connection.token];
              request = setQueryParams(mergeParams, "/predictors/lwr/jsonai/edit/".concat(_this.name));
              _context10.next = 4;
              return connection.api.put(request);

            case 4:
              return _context10.abrupt("return", response.data);

            case 5:
            case "end":
              return _context10.stop();
          }
        }
      }, _callee10);
    }));

    return function (_x9) {
      return _ref10.apply(this, arguments);
    };
  }());

  _defineProperty(this, "codeAI_edit", /*#__PURE__*/function () {
    var _ref11 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee11(params) {
      var mergeParams, request;
      return _regeneratorRuntime.wrap(function _callee11$(_context11) {
        while (1) {
          switch (_context11.prev = _context11.next) {
            case 0:
              mergeParams = params ? [].concat(_toConsumableArray(params), [connection.token]) : [connection.token];
              request = setQueryParams(mergeParams, "/predictors/lwr/code/edit/".concat(_this.name));
              _context11.next = 4;
              return connection.api.put(request);

            case 4:
              return _context11.abrupt("return", response.data);

            case 5:
            case "end":
              return _context11.stop();
          }
        }
      }, _callee11);
    }));

    return function (_x10) {
      return _ref11.apply(this, arguments);
    };
  }());

  _defineProperty(this, "load", /*#__PURE__*/function () {
    var _ref12 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee12(params) {
      var mergeParams, url_path, request, response;
      return _regeneratorRuntime.wrap(function _callee12$(_context12) {
        while (1) {
          switch (_context12.prev = _context12.next) {
            case 0:
              mergeParams = params ? [].concat(_toConsumableArray(params), [connection.token]) : [connection.token];
              url_path = "/predictors/";

              if (_this.name !== undefined && _this.name !== "") {
                url_path += "".concat(_this.name);
              }

              request = setQueryParams(mergeParams, url_path);
              _context12.next = 6;
              return connection.api.get(request);

            case 6:
              response = _context12.sent;
              Object.assign(_this, response.data);
              return _context12.abrupt("return", _this);

            case 9:
            case "end":
              return _context12.stop();
          }
        }
      }, _callee12);
    }));

    return function (_x11) {
      return _ref12.apply(this, arguments);
    };
  }());

  _defineProperty(this, "rename", /*#__PURE__*/function () {
    var _ref13 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee13(params) {
      var mergeParams, request, response;
      return _regeneratorRuntime.wrap(function _callee13$(_context13) {
        while (1) {
          switch (_context13.prev = _context13.next) {
            case 0:
              mergeParams = params ? [].concat(_toConsumableArray(params), [connection.token]) : [connection.token];
              request = setQueryParams(mergeParams, "/predictors/".concat(params.oldName, "/rename?new_name=").concat(params.newName));
              _context13.next = 4;
              return connection.api.get(request);

            case 4:
              response = _context13.sent;
              return _context13.abrupt("return", response.data);

            case 6:
            case "end":
              return _context13.stop();
          }
        }
      }, _callee13);
    }));

    return function (_x12) {
      return _ref13.apply(this, arguments);
    };
  }());

  _defineProperty(this, "loadColumns", /*#__PURE__*/function () {
    var _ref14 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee14(params) {
      var mergeParams, request, response;
      return _regeneratorRuntime.wrap(function _callee14$(_context14) {
        while (1) {
          switch (_context14.prev = _context14.next) {
            case 0:
              mergeParams = params ? [].concat(_toConsumableArray(params), [connection.token]) : [connection.token];
              request = setQueryParams(mergeParams, "/predictors/".concat(_this.name, "/columns"));
              _context14.next = 4;
              return connection.api.get(request);

            case 4:
              response = _context14.sent;
              _this.columns = response.data;
              return _context14.abrupt("return", _this);

            case 7:
            case "end":
              return _context14.stop();
          }
        }
      }, _callee14);
    }));

    return function (_x13) {
      return _ref14.apply(this, arguments);
    };
  }());

  _defineProperty(this, "update", /*#__PURE__*/function () {
    var _ref15 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee15(params, predictorName) {
      var mergeParams, request, response;
      return _regeneratorRuntime.wrap(function _callee15$(_context15) {
        while (1) {
          switch (_context15.prev = _context15.next) {
            case 0:
              mergeParams = params ? [].concat(_toConsumableArray(params), [connection.token]) : [connection.token];
              request = setQueryParams(mergeParams, "/predictors/".concat(predictorName, "/update"));
              _context15.next = 4;
              return connection.api.get(request);

            case 4:
              response = _context15.sent;
              return _context15.abrupt("return", response);

            case 6:
            case "end":
              return _context15.stop();
          }
        }
      }, _callee15);
    }));

    return function (_x14, _x15) {
      return _ref15.apply(this, arguments);
    };
  }());

  _defineProperty(this, "learn_lwr", /*#__PURE__*/function () {
    var _ref16 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee16(data_source_name, problem_definition, params) {
      var mergeParams, request;
      return _regeneratorRuntime.wrap(function _callee16$(_context16) {
        while (1) {
          switch (_context16.prev = _context16.next) {
            case 0:
              mergeParams = params ? [].concat(_toConsumableArray(params), [connection.token]) : [connection.token];
              request = setQueryParams(mergeParams, "/predictors/lwr/generate/".concat(_this.name));
              _context16.next = 4;
              return connection.api.put(request, {
                data_source_name: data_source_name,
                problem_definition: problem_definition
              });

            case 4:
              return _context16.abrupt("return", response.data);

            case 5:
            case "end":
              return _context16.stop();
          }
        }
      }, _callee16);
    }));

    return function (_x16, _x17, _x18) {
      return _ref16.apply(this, arguments);
    };
  }());

  _defineProperty(this, "learn", /*#__PURE__*/function () {
    var _ref18 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee17(_ref17, params) {
      var dataSourceName, fromData, toPredict, kwargs, data, mergeParams, request, response;
      return _regeneratorRuntime.wrap(function _callee17$(_context17) {
        while (1) {
          switch (_context17.prev = _context17.next) {
            case 0:
              dataSourceName = _ref17.dataSourceName, fromData = _ref17.fromData, toPredict = _ref17.toPredict, kwargs = _ref17.kwargs;
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
              _context17.next = 8;
              return connection.api.put(request, data);

            case 8:
              response = _context17.sent;
              return _context17.abrupt("return", response.data);

            case 10:
            case "end":
              return _context17.stop();
          }
        }
      }, _callee17);
    }));

    return function (_x19, _x20) {
      return _ref18.apply(this, arguments);
    };
  }());

  _defineProperty(this, "queryPredict", /*#__PURE__*/function () {
    var _ref19 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee18(when, params, format_flag_value) {
      var mergeParams, request, response;
      return _regeneratorRuntime.wrap(function _callee18$(_context18) {
        while (1) {
          switch (_context18.prev = _context18.next) {
            case 0:
              mergeParams = params ? [].concat(_toConsumableArray(params), [connection.token]) : [connection.token];
              request = setQueryParams(mergeParams, "/predictors/".concat(_this.name, "/predict"));
              _context18.next = 4;
              return connection.api.post(request, {
                when: when,
                format_flag: format_flag_value
              });

            case 4:
              response = _context18.sent;
              return _context18.abrupt("return", response.data);

            case 6:
            case "end":
              return _context18.stop();
          }
        }
      }, _callee18);
    }));

    return function (_x21, _x22, _x23) {
      return _ref19.apply(this, arguments);
    };
  }());

  _defineProperty(this, "delete", /*#__PURE__*/function () {
    var _ref20 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee19(params) {
      var mergeParams, request;
      return _regeneratorRuntime.wrap(function _callee19$(_context19) {
        while (1) {
          switch (_context19.prev = _context19.next) {
            case 0:
              mergeParams = params ? [].concat(_toConsumableArray(params), [connection.token]) : [connection.token];
              request = setQueryParams(mergeParams, "/predictors/".concat(_this.name));
              _context19.next = 4;
              return connection.api.delete(request);

            case 4:
            case "end":
              return _context19.stop();
          }
        }
      }, _callee19);
    }));

    return function (_x24) {
      return _ref20.apply(this, arguments);
    };
  }());

  _defineProperty(this, "upload", /*#__PURE__*/function () {
    var _ref21 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee20(file, onProgress, params) {
      var mergeParams, fd, config, request;
      return _regeneratorRuntime.wrap(function _callee20$(_context20) {
        while (1) {
          switch (_context20.prev = _context20.next) {
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
              _context20.next = 7;
              return connection.api.post(request, fd, config);

            case 7:
            case "end":
              return _context20.stop();
          }
        }
      }, _callee20);
    }));

    return function (_x25, _x26, _x27) {
      return _ref21.apply(this, arguments);
    };
  }());

  _defineProperty(this, "download", /*#__PURE__*/function () {
    var _ref22 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee21(params) {
      var mergeParams, request, response;
      return _regeneratorRuntime.wrap(function _callee21$(_context21) {
        while (1) {
          switch (_context21.prev = _context21.next) {
            case 0:
              mergeParams = params ? [].concat(_toConsumableArray(params), [connection.token]) : [connection.token];
              request = setQueryParams(mergeParams, "/predictors/".concat(_this.name, "/download"));
              _context21.next = 4;
              return connection.api.get(request, {
                responseType: "blob"
              });

            case 4:
              response = _context21.sent;
              saveFile(response);
              return _context21.abrupt("return", _this);

            case 7:
            case "end":
              return _context21.stop();
          }
        }
      }, _callee21);
    }));

    return function (_x28) {
      return _ref22.apply(this, arguments);
    };
  }());

  _defineProperty(this, "getDownloadUrl", function () {
    return "".concat(connection.url, "/predictors/").concat(_this.name, "/download");
  });

  Object.assign(this, _data);
} // Lightwood Refactor ⚒
;

var DataSource = function DataSource(_data2) {
  var _this2 = this;

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

  _defineProperty(this, "load", /*#__PURE__*/function () {
    var _ref23 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee22(params) {
      var mergeParams, request, response;
      return _regeneratorRuntime.wrap(function _callee22$(_context22) {
        while (1) {
          switch (_context22.prev = _context22.next) {
            case 0:
              mergeParams = params ? [].concat(_toConsumableArray(params), [connection.token]) : [connection.token];
              request = setQueryParams(mergeParams, "/datasources/".concat(_this2.name));
              _context22.next = 4;
              return connection.api.get(request);

            case 4:
              response = _context22.sent;
              Object.assign(_this2, response.data);
              return _context22.abrupt("return", _this2);

            case 7:
            case "end":
              return _context22.stop();
          }
        }
      }, _callee22);
    }));

    return function (_x29) {
      return _ref23.apply(this, arguments);
    };
  }());

  _defineProperty(this, "upload", /*#__PURE__*/function () {
    var _ref24 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee23(file, onProgress, params) {
      var mergeParams, fd, config, request;
      return _regeneratorRuntime.wrap(function _callee23$(_context23) {
        while (1) {
          switch (_context23.prev = _context23.next) {
            case 0:
              _this2.source_type = "file";
              _this2.source = file.name;
              mergeParams = params ? [].concat(_toConsumableArray(params), [connection.token]) : [connection.token];
              fd = new FormData();
              fd.append("name", _this2.name);
              fd.append("source_type", _this2.source_type);
              fd.append("source", _this2.source);
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
              request = setQueryParams(mergeParams, "/datasources/".concat(_this2.name));
              _context23.next = 12;
              return connection.api.put(request, fd, config);

            case 12:
            case "end":
              return _context23.stop();
          }
        }
      }, _callee23);
    }));

    return function (_x30, _x31, _x32) {
      return _ref24.apply(this, arguments);
    };
  }());

  _defineProperty(this, "uploadFromUrl", /*#__PURE__*/function () {
    var _ref25 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee24(url, params) {
      var data, mergeParams, request;
      return _regeneratorRuntime.wrap(function _callee24$(_context24) {
        while (1) {
          switch (_context24.prev = _context24.next) {
            case 0:
              _this2.source_type = "url";
              _this2.source = url;
              data = {
                name: _this2.name,
                source_type: _this2.source_type,
                source: _this2.source
              };
              mergeParams = params ? [].concat(_toConsumableArray(params), [connection.token]) : [connection.token];
              request = setQueryParams(mergeParams, "/datasources/".concat(_this2.name));
              _context24.next = 7;
              return connection.api.put(request, data);

            case 7:
            case "end":
              return _context24.stop();
          }
        }
      }, _callee24);
    }));

    return function (_x33, _x34) {
      return _ref25.apply(this, arguments);
    };
  }());

  _defineProperty(this, "download", /*#__PURE__*/function () {
    var _ref26 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee25(params) {
      var url, mergeParams, request, response;
      return _regeneratorRuntime.wrap(function _callee25$(_context25) {
        while (1) {
          switch (_context25.prev = _context25.next) {
            case 0:
              url = _this2.getDownloadUrl();
              mergeParams = params ? [].concat(_toConsumableArray(params), [connection.token]) : [connection.token];
              request = setQueryParams(mergeParams, url);
              _context25.next = 5;
              return connection.api.get(request, {
                responseType: "blob"
              });

            case 5:
              response = _context25.sent;
              saveFile(response, _this2.source);
              return _context25.abrupt("return", _this2);

            case 8:
            case "end":
              return _context25.stop();
          }
        }
      }, _callee25);
    }));

    return function (_x35) {
      return _ref26.apply(this, arguments);
    };
  }());

  _defineProperty(this, "getDownloadUrl", function () {
    return _this2.source_type === "url" ? _this2.source : "".concat(connection.url, "/datasources/").concat(_this2.name, "/download");
  });

  _defineProperty(this, "delete", /*#__PURE__*/function () {
    var _ref27 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee26(params) {
      var mergeParams, request;
      return _regeneratorRuntime.wrap(function _callee26$(_context26) {
        while (1) {
          switch (_context26.prev = _context26.next) {
            case 0:
              mergeParams = params ? [].concat(_toConsumableArray(params), [connection.token]) : [connection.token];
              request = setQueryParams(mergeParams, "/datasources/".concat(_this2.name));
              _context26.next = 4;
              return connection.api.delete(request);

            case 4:
            case "end":
              return _context26.stop();
          }
        }
      }, _callee26);
    }));

    return function (_x36) {
      return _ref27.apply(this, arguments);
    };
  }());

  _defineProperty(this, "loadData", /*#__PURE__*/function () {
    var _ref28 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee27(params) {
      var mergeParams, request, response;
      return _regeneratorRuntime.wrap(function _callee27$(_context27) {
        while (1) {
          switch (_context27.prev = _context27.next) {
            case 0:
              mergeParams = params ? [].concat(_toConsumableArray(params), [connection.token]) : [connection.token];
              request = setQueryParams(mergeParams, "/datasources/".concat(_this2.name, "/data/"));
              _context27.next = 4;
              return connection.api.get(request);

            case 4:
              response = _context27.sent;
              _this2.data = response.data;
              return _context27.abrupt("return", _this2.data);

            case 7:
            case "end":
              return _context27.stop();
          }
        }
      }, _callee27);
    }));

    return function (_x37) {
      return _ref28.apply(this, arguments);
    };
  }());

  _defineProperty(this, "loadDataQuality", /*#__PURE__*/function () {
    var _ref29 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee28(params) {
      var mergeParams, request, data, _response;

      return _regeneratorRuntime.wrap(function _callee28$(_context28) {
        while (1) {
          switch (_context28.prev = _context28.next) {
            case 0:
              mergeParams = params ? [].concat(_toConsumableArray(params), [connection.token]) : [connection.token];
              request = setQueryParams(mergeParams, "/datasources/".concat(_this2.name, "/analyze"));
              _context28.prev = 2;
              _context28.next = 5;
              return connection.api.get(request);

            case 5:
              _response = _context28.sent;
              data = {
                data_preparation: _response.data["data_preparation"],
                data_analysis_v2: _response.data["data_analysis_v2"],
                useable_input_columns: _response.data["useable_input_columns"],
                current_phase: _response.data["current_phase"],
                versionNative: _response.data["version"],
                status: _response.data && _response.data.status
              };
              _context28.next = 13;
              break;

            case 9:
              _context28.prev = 9;
              _context28.t0 = _context28["catch"](2);
              Object.assign(_this2, {
                error: _context28.t0
              });
              console.error(_context28.t0);

            case 13:
              _this2.dataQuality = data;
              return _context28.abrupt("return", data);

            case 15:
            case "end":
              return _context28.stop();
          }
        }
      }, _callee28, null, [[2, 9]]);
    }));

    return function (_x38) {
      return _ref29.apply(this, arguments);
    };
  }());

  _defineProperty(this, "loadMissedFileList", /*#__PURE__*/function () {
    var _ref30 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee29(params) {
      var mergeParams, request, response;
      return _regeneratorRuntime.wrap(function _callee29$(_context29) {
        while (1) {
          switch (_context29.prev = _context29.next) {
            case 0:
              mergeParams = params ? [].concat(_toConsumableArray(params), [connection.token]) : [connection.token];
              request = setQueryParams(mergeParams, "/datasources/".concat(_this2.name, "/missed_files"));
              _context29.next = 4;
              return connection.api.get(request);

            case 4:
              response = _context29.sent;
              _this2.missedFileList = response.data;
              return _context29.abrupt("return", _this2.missedFileList);

            case 7:
            case "end":
              return _context29.stop();
          }
        }
      }, _callee29);
    }));

    return function (_x39) {
      return _ref30.apply(this, arguments);
    };
  }());

  _defineProperty(this, "uploadFile", /*#__PURE__*/function () {
    var _ref32 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee30(_ref31, params) {
      var column, rowIndex, extension, file, fd, mergeParams, request, response;
      return _regeneratorRuntime.wrap(function _callee30$(_context30) {
        while (1) {
          switch (_context30.prev = _context30.next) {
            case 0:
              column = _ref31.column, rowIndex = _ref31.rowIndex, extension = _ref31.extension, file = _ref31.file;
              fd = new FormData();
              fd.append("file", file);
              fd.append("extension", extension);
              mergeParams = params ? [].concat(_toConsumableArray(params), [connection.token]) : [connection.token];
              request = setQueryParams(mergeParams, "/datasources/".concat(_this2.name, "/files/").concat(column, ":").concat(rowIndex));
              _context30.next = 8;
              return connection.api.put(request, fd);

            case 8:
              response = _context30.sent;
              return _context30.abrupt("return", response.status === 200);

            case 10:
            case "end":
              return _context30.stop();
          }
        }
      }, _callee30);
    }));

    return function (_x40, _x41) {
      return _ref32.apply(this, arguments);
    };
  }());

  Object.assign(this, _data2);
};

var DataBase = function DataBase(_data3) {
  var _this3 = this;

  _classCallCheck(this, DataBase);

  _defineProperty(this, "loaded", false);

  _defineProperty(this, "source_type", "url");

  _defineProperty(this, "integration", []);

  _defineProperty(this, "load", /*#__PURE__*/function () {
    var _ref33 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee31(params) {
      var mergeParams, deRequest, _response2;

      return _regeneratorRuntime.wrap(function _callee31$(_context31) {
        while (1) {
          switch (_context31.prev = _context31.next) {
            case 0:
              mergeParams = params ? [].concat(_toConsumableArray(params), [connection.token]) : [connection.token];
              _context31.prev = 1;
              deRequest = setQueryParams(mergeParams, "config/all_integrations");
              _context31.next = 5;
              return connection.api.get(deRequest);

            case 5:
              _response2 = _context31.sent;
              Object.assign(_this3, _response2);
              return _context31.abrupt("return", _this3);

            case 10:
              _context31.prev = 10;
              _context31.t0 = _context31["catch"](1);
              Object.assign(_this3, {
                error: _context31.t0
              });
              console.error(_context31.t0);

            case 14:
            case "end":
              return _context31.stop();
          }
        }
      }, _callee31, null, [[1, 10]]);
    }));

    return function (_x42) {
      return _ref33.apply(this, arguments);
    };
  }());

  _defineProperty(this, "delete", /*#__PURE__*/function () {
    var _ref34 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee32(params) {
      return _regeneratorRuntime.wrap(function _callee32$(_context32) {
        while (1) {
          switch (_context32.prev = _context32.next) {
            case 0:
              _context32.next = 2;
              return connection.api.delete("/config/integrations/".concat(params.db_name));

            case 2:
            case "end":
              return _context32.stop();
          }
        }
      }, _callee32);
    }));

    return function (_x43) {
      return _ref34.apply(this, arguments);
    };
  }());

  _defineProperty(this, "check", /*#__PURE__*/function () {
    var _ref35 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee33(params) {
      return _regeneratorRuntime.wrap(function _callee33$(_context33) {
        while (1) {
          switch (_context33.prev = _context33.next) {
            case 0:
              _context33.next = 2;
              return connection.api.get("/config/integrations/".concat(params.integrations_name, "/check"));

            case 2:
              return _context33.abrupt("return", _context33.sent);

            case 3:
            case "end":
              return _context33.stop();
          }
        }
      }, _callee33);
    }));

    return function (_x44) {
      return _ref35.apply(this, arguments);
    };
  }());

  _defineProperty(this, "edit", /*#__PURE__*/function () {
    var _ref36 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee34(data, params) {
      var mergeParams, request, response;
      return _regeneratorRuntime.wrap(function _callee34$(_context34) {
        while (1) {
          switch (_context34.prev = _context34.next) {
            case 0:
              mergeParams = params ? [].concat(_toConsumableArray(params), [connection.token]) : [connection.token];
              request = setQueryParams(mergeParams, "/config/integrations/".concat(data.params.integrations_name));
              _context34.next = 4;
              return connection.api.post(request, data);

            case 4:
              response = _context34.sent;
              return _context34.abrupt("return", response.data);

            case 6:
            case "end":
              return _context34.stop();
          }
        }
      }, _callee34);
    }));

    return function (_x45, _x46) {
      return _ref36.apply(this, arguments);
    };
  }());

  _defineProperty(this, "create", /*#__PURE__*/function () {
    var _ref37 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee35(data, params) {
      var mergeParams, request, response;
      return _regeneratorRuntime.wrap(function _callee35$(_context35) {
        while (1) {
          switch (_context35.prev = _context35.next) {
            case 0:
              mergeParams = params ? [].concat(_toConsumableArray(params), [connection.token]) : [connection.token];
              request = setQueryParams(mergeParams, "/config/integrations/".concat(data.params.integrations_name));
              _context35.next = 4;
              return connection.api.put(request, data);

            case 4:
              response = _context35.sent;
              return _context35.abrupt("return", response.data);

            case 6:
            case "end":
              return _context35.stop();
          }
        }
      }, _callee35);
    }));

    return function (_x47, _x48) {
      return _ref37.apply(this, arguments);
    };
  }());

  _defineProperty(this, "newDataset", /*#__PURE__*/function () {
    var _ref38 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee36(data, params) {
      var mergeParams, request;
      return _regeneratorRuntime.wrap(function _callee36$(_context36) {
        while (1) {
          switch (_context36.prev = _context36.next) {
            case 0:
              mergeParams = params ? [].concat(_toConsumableArray(params), [connection.token]) : [connection.token];
              _context36.prev = 1;
              request = setQueryParams(mergeParams, "/datasources/".concat(data.name));
              _context36.next = 5;
              return connection.api.put(request, data);

            case 5:
              return _context36.abrupt("return", _context36.sent);

            case 8:
              _context36.prev = 8;
              _context36.t0 = _context36["catch"](1);
              return _context36.abrupt("return", _context36.t0);

            case 11:
            case "end":
              return _context36.stop();
          }
        }
      }, _callee36, null, [[1, 8]]);
    }));

    return function (_x49, _x50) {
      return _ref38.apply(this, arguments);
    };
  }());

  Object.assign(this, _data3);
};

var MindsDB = {
  connect: connect,
  disconnect: disconnect,
  ping: ping,
  logs: logs,
  dependencies: dependencies,
  installDependencies: installDependencies,
  getEnvs: getEnvs,
  uppdateVar: uppdateVar,
  predictors: predictors,
  dataSources: dataSources,
  DataSource: dataSource,
  Predictor: predictor,
  DataBase: database
};

module.exports = MindsDB;
