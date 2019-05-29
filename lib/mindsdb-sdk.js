'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var _classCallCheck = _interopDefault(require('@babel/runtime/helpers/classCallCheck'));
var _defineProperty = _interopDefault(require('@babel/runtime/helpers/defineProperty'));
var _regeneratorRuntime = _interopDefault(require('@babel/runtime/regenerator'));
var _typeof = _interopDefault(require('@babel/runtime/helpers/typeof'));
var _asyncToGenerator = _interopDefault(require('@babel/runtime/helpers/asyncToGenerator'));
var axios = _interopDefault(require('axios'));

var connection = {
  url: null,
  api: null,
  version: 0.1
};

var connect = function connect(url) {
  connection.url = url;
  connection.api = axios.create({
    baseURL: url,
    timeout: 20000
  });
};

var disconnect = function disconnect() {
  connection.url = null;
  connection.token = null;
  connection.api = null;
};

var ping =
/*#__PURE__*/
function () {
  var _ref = _asyncToGenerator(
  /*#__PURE__*/
  _regeneratorRuntime.mark(function _callee() {
    var response;
    return _regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return connection.api.get('/util/ping');

          case 2:
            response = _context.sent;

            if (!(response.status === 200 && _typeof(response.data) === 'object' && response.data.status === 'ok')) {
              _context.next = 5;
              break;
            }

            return _context.abrupt("return", true);

          case 5:
            return _context.abrupt("return", false);

          case 6:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function ping() {
    return _ref.apply(this, arguments);
  };
}();

var predictor = function predictor(opts) {
  return new Predictor(opts);
};

var dataSource = function dataSource(opts) {
  return new DataSource(opts);
};

var predictors =
/*#__PURE__*/
function () {
  var _ref2 = _asyncToGenerator(
  /*#__PURE__*/
  _regeneratorRuntime.mark(function _callee2() {
    var response, rawData, predictorList;
    return _regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return connection.api.get('/predictors/');

          case 2:
            response = _context2.sent;
            rawData = response.data || [];
            predictorList = rawData.map(predictor);
            return _context2.abrupt("return", predictorList);

          case 6:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function predictors() {
    return _ref2.apply(this, arguments);
  };
}();

var dataSources =
/*#__PURE__*/
function () {
  var _ref3 = _asyncToGenerator(
  /*#__PURE__*/
  _regeneratorRuntime.mark(function _callee3() {
    var response, rawData, dataSourceList;
    return _regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return connection.api.get('/datasources/');

          case 2:
            response = _context3.sent;
            rawData = response.data || [];
            dataSourceList = rawData.map(dataSource);
            return _context3.abrupt("return", dataSourceList);

          case 6:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));

  return function dataSources() {
    return _ref3.apply(this, arguments);
  };
}();

var saveFile = function saveFile(response, source) {
  var url = window.URL.createObjectURL(new Blob([response.data]));
  var link = document.createElement('a');
  link.href = url;
  var contentDisposition = response.headers['content-disposition'];
  var fileName = null;

  if (contentDisposition) {
    var fileNameMatch = contentDisposition.match(/filename="?(.+)"?/);

    if (fileNameMatch.length === 2) {
      fileName = fileNameMatch[1];
    }
  }

  if (!fileName && source) {
    var parts = source.split('/');
    var end = parts[parts.length - 1];
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

var Predictor = function Predictor(_data) {
  var _this = this;

  _classCallCheck(this, Predictor);

  _defineProperty(this, "loaded", false);

  _defineProperty(this, "name", '');

  _defineProperty(this, "version", '');

  _defineProperty(this, "is_active", false);

  _defineProperty(this, "data_source", '');

  _defineProperty(this, "predict", null);

  _defineProperty(this, "accuracy", 0);

  _defineProperty(this, "status", '');

  _defineProperty(this, "train_end_at", null);

  _defineProperty(this, "updated_at", null);

  _defineProperty(this, "created_at", null);

  _defineProperty(this, "data_preparation", null);

  _defineProperty(this, "data_analysis", null);

  _defineProperty(this, "model_analysis", null);

  _defineProperty(this, "columns", null);

  _defineProperty(this, "load",
  /*#__PURE__*/
  _asyncToGenerator(
  /*#__PURE__*/
  _regeneratorRuntime.mark(function _callee4() {
    var response;
    return _regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.next = 2;
            return connection.api.get("/predictors/".concat(_this.name));

          case 2:
            response = _context4.sent;
            Object.assign(_this, response.data);
            return _context4.abrupt("return", _this);

          case 5:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  })));

  _defineProperty(this, "loadColumns",
  /*#__PURE__*/
  _asyncToGenerator(
  /*#__PURE__*/
  _regeneratorRuntime.mark(function _callee5() {
    var response;
    return _regeneratorRuntime.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _context5.next = 2;
            return connection.api.get("/predictors/".concat(_this.name, "/columns"));

          case 2:
            response = _context5.sent;
            _this.columns = response.data;
            return _context5.abrupt("return", _this);

          case 5:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5);
  })));

  _defineProperty(this, "learn",
  /*#__PURE__*/
  function () {
    var _ref7 = _asyncToGenerator(
    /*#__PURE__*/
    _regeneratorRuntime.mark(function _callee6(_ref6) {
      var dataSourceName, fromData, toPredict, data, response;
      return _regeneratorRuntime.wrap(function _callee6$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              dataSourceName = _ref6.dataSourceName, fromData = _ref6.fromData, toPredict = _ref6.toPredict;
              data = {
                to_predict: toPredict
              };

              if (dataSourceName) {
                data.data_source_name = dataSourceName;
              } else if (fromData) {
                data.from_data = fromData;
              }

              _context6.next = 5;
              return connection.api.put("/predictors/".concat(_this.name), data);

            case 5:
              response = _context6.sent;
              return _context6.abrupt("return", response.data);

            case 7:
            case "end":
              return _context6.stop();
          }
        }
      }, _callee6);
    }));

    return function (_x) {
      return _ref7.apply(this, arguments);
    };
  }());

  _defineProperty(this, "queryPredict",
  /*#__PURE__*/
  function () {
    var _ref8 = _asyncToGenerator(
    /*#__PURE__*/
    _regeneratorRuntime.mark(function _callee7(when) {
      var response;
      return _regeneratorRuntime.wrap(function _callee7$(_context7) {
        while (1) {
          switch (_context7.prev = _context7.next) {
            case 0:
              _context7.next = 2;
              return connection.api.post("/predictors/".concat(_this.name, "/predict"), {
                when: when
              });

            case 2:
              response = _context7.sent;
              return _context7.abrupt("return", response.data);

            case 4:
            case "end":
              return _context7.stop();
          }
        }
      }, _callee7);
    }));

    return function (_x2) {
      return _ref8.apply(this, arguments);
    };
  }());

  _defineProperty(this, "delete",
  /*#__PURE__*/
  _asyncToGenerator(
  /*#__PURE__*/
  _regeneratorRuntime.mark(function _callee8() {
    return _regeneratorRuntime.wrap(function _callee8$(_context8) {
      while (1) {
        switch (_context8.prev = _context8.next) {
          case 0:
            _context8.next = 2;
            return connection.api.delete("/predictors/".concat(_this.name));

          case 2:
          case "end":
            return _context8.stop();
        }
      }
    }, _callee8);
  })));

  _defineProperty(this, "upload",
  /*#__PURE__*/
  function () {
    var _ref10 = _asyncToGenerator(
    /*#__PURE__*/
    _regeneratorRuntime.mark(function _callee9(file, onProgress) {
      var fd, config;
      return _regeneratorRuntime.wrap(function _callee9$(_context9) {
        while (1) {
          switch (_context9.prev = _context9.next) {
            case 0:
              fd = new FormData();
              fd.append('file', file);
              config = {
                onUploadProgress: function onUploadProgress(progressEvent) {
                  if (onProgress) {
                    var percentCompleted = Math.round(progressEvent.loaded * 100 / progressEvent.total);
                    onProgress(percentCompleted);
                  }
                }
              };
              _context9.next = 5;
              return connection.api.post('/predictors/upload', fd, config);

            case 5:
            case "end":
              return _context9.stop();
          }
        }
      }, _callee9);
    }));

    return function (_x3, _x4) {
      return _ref10.apply(this, arguments);
    };
  }());

  _defineProperty(this, "download",
  /*#__PURE__*/
  _asyncToGenerator(
  /*#__PURE__*/
  _regeneratorRuntime.mark(function _callee10() {
    var response;
    return _regeneratorRuntime.wrap(function _callee10$(_context10) {
      while (1) {
        switch (_context10.prev = _context10.next) {
          case 0:
            _context10.next = 2;
            return connection.api.get("/predictors/".concat(_this.name, "/download"), {
              responseType: 'blob'
            });

          case 2:
            response = _context10.sent;
            saveFile(response);
            return _context10.abrupt("return", _this);

          case 5:
          case "end":
            return _context10.stop();
        }
      }
    }, _callee10);
  })));

  _defineProperty(this, "getDownloadUrl", function () {
    return "".concat(connection.url, "/predictors/").concat(_this.name, "/download");
  });

  Object.assign(this, _data);
};

var DataSource = function DataSource(_data2) {
  var _this2 = this;

  _classCallCheck(this, DataSource);

  _defineProperty(this, "loaded", false);

  _defineProperty(this, "source_type", 'url');

  _defineProperty(this, "source", '');

  _defineProperty(this, "name", '');

  _defineProperty(this, "source", '');

  _defineProperty(this, "missed_files", false);

  _defineProperty(this, "created_at", null);

  _defineProperty(this, "updated_at", null);

  _defineProperty(this, "row_count", 0);

  _defineProperty(this, "columns", null);

  _defineProperty(this, "data", null);

  _defineProperty(this, "missedFileList", null);

  _defineProperty(this, "load",
  /*#__PURE__*/
  _asyncToGenerator(
  /*#__PURE__*/
  _regeneratorRuntime.mark(function _callee11() {
    var response;
    return _regeneratorRuntime.wrap(function _callee11$(_context11) {
      while (1) {
        switch (_context11.prev = _context11.next) {
          case 0:
            _context11.next = 2;
            return connection.api.get("/datasources/".concat(_this2.name));

          case 2:
            response = _context11.sent;
            Object.assign(_this2, response.data);
            return _context11.abrupt("return", _this2);

          case 5:
          case "end":
            return _context11.stop();
        }
      }
    }, _callee11);
  })));

  _defineProperty(this, "setSource", function () {});

  _defineProperty(this, "upload",
  /*#__PURE__*/
  function () {
    var _ref13 = _asyncToGenerator(
    /*#__PURE__*/
    _regeneratorRuntime.mark(function _callee12(file, onProgress) {
      var fd, config;
      return _regeneratorRuntime.wrap(function _callee12$(_context12) {
        while (1) {
          switch (_context12.prev = _context12.next) {
            case 0:
              _this2.source_type = 'file';
              _this2.source = file.name;
              fd = new FormData();
              fd.append('name', _this2.name);
              fd.append('source_type', _this2.source_type);
              fd.append('source', _this2.source);
              fd.append('file', file);
              config = {
                onUploadProgress: function onUploadProgress(progressEvent) {
                  if (onProgress) {
                    var percentCompleted = Math.round(progressEvent.loaded * 100 / progressEvent.total);
                    onProgress(percentCompleted);
                  }
                }
              };
              _context12.next = 10;
              return connection.api.put("/datasources/".concat(_this2.name), fd, config);

            case 10:
            case "end":
              return _context12.stop();
          }
        }
      }, _callee12);
    }));

    return function (_x5, _x6) {
      return _ref13.apply(this, arguments);
    };
  }());

  _defineProperty(this, "uploadFromUrl",
  /*#__PURE__*/
  function () {
    var _ref14 = _asyncToGenerator(
    /*#__PURE__*/
    _regeneratorRuntime.mark(function _callee13(url) {
      var data;
      return _regeneratorRuntime.wrap(function _callee13$(_context13) {
        while (1) {
          switch (_context13.prev = _context13.next) {
            case 0:
              _this2.source_type = 'url';
              _this2.source = url;
              data = {
                name: _this2.name,
                source_type: _this2.source_type,
                source: _this2.source
              };
              _context13.next = 5;
              return connection.api.put("/datasources/".concat(_this2.name), data);

            case 5:
            case "end":
              return _context13.stop();
          }
        }
      }, _callee13);
    }));

    return function (_x7) {
      return _ref14.apply(this, arguments);
    };
  }());

  _defineProperty(this, "download",
  /*#__PURE__*/
  _asyncToGenerator(
  /*#__PURE__*/
  _regeneratorRuntime.mark(function _callee14() {
    var url, response;
    return _regeneratorRuntime.wrap(function _callee14$(_context14) {
      while (1) {
        switch (_context14.prev = _context14.next) {
          case 0:
            url = _this2.getDownloadUrl();
            _context14.next = 3;
            return connection.api.get(url, {
              responseType: 'blob'
            });

          case 3:
            response = _context14.sent;
            saveFile(response, _this2.source);
            return _context14.abrupt("return", _this2);

          case 6:
          case "end":
            return _context14.stop();
        }
      }
    }, _callee14);
  })));

  _defineProperty(this, "getDownloadUrl", function () {
    return _this2.source_type === 'url' ? _this2.source : "".concat(connection.url, "/datasources/").concat(_this2.name, "/download");
  });

  _defineProperty(this, "delete",
  /*#__PURE__*/
  _asyncToGenerator(
  /*#__PURE__*/
  _regeneratorRuntime.mark(function _callee15() {
    return _regeneratorRuntime.wrap(function _callee15$(_context15) {
      while (1) {
        switch (_context15.prev = _context15.next) {
          case 0:
            _context15.next = 2;
            return connection.api.delete("/datasources/".concat(_this2.name));

          case 2:
          case "end":
            return _context15.stop();
        }
      }
    }, _callee15);
  })));

  _defineProperty(this, "loadData",
  /*#__PURE__*/
  _asyncToGenerator(
  /*#__PURE__*/
  _regeneratorRuntime.mark(function _callee16() {
    var response;
    return _regeneratorRuntime.wrap(function _callee16$(_context16) {
      while (1) {
        switch (_context16.prev = _context16.next) {
          case 0:
            _context16.next = 2;
            return connection.api.get("/datasources/".concat(_this2.name, "/data"));

          case 2:
            response = _context16.sent;
            _this2.data = response.data;
            return _context16.abrupt("return", _this2.data);

          case 5:
          case "end":
            return _context16.stop();
        }
      }
    }, _callee16);
  })));

  _defineProperty(this, "loadMissedFileList",
  /*#__PURE__*/
  _asyncToGenerator(
  /*#__PURE__*/
  _regeneratorRuntime.mark(function _callee17() {
    var response;
    return _regeneratorRuntime.wrap(function _callee17$(_context17) {
      while (1) {
        switch (_context17.prev = _context17.next) {
          case 0:
            _context17.next = 2;
            return connection.api.get("/datasources/".concat(_this2.name, "/missed_files"));

          case 2:
            response = _context17.sent;
            _this2.missedFileList = response.data;
            return _context17.abrupt("return", _this2.missedFileList);

          case 5:
          case "end":
            return _context17.stop();
        }
      }
    }, _callee17);
  })));

  _defineProperty(this, "uploadFile",
  /*#__PURE__*/
  function () {
    var _ref20 = _asyncToGenerator(
    /*#__PURE__*/
    _regeneratorRuntime.mark(function _callee18(_ref19) {
      var column, rowIndex, extension, file, fd, response;
      return _regeneratorRuntime.wrap(function _callee18$(_context18) {
        while (1) {
          switch (_context18.prev = _context18.next) {
            case 0:
              column = _ref19.column, rowIndex = _ref19.rowIndex, extension = _ref19.extension, file = _ref19.file;
              fd = new FormData();
              fd.append('file', file);
              fd.append('extension', extension);
              _context18.next = 6;
              return connection.api.put("/datasources/".concat(_this2.name, "/files/").concat(column, ":").concat(rowIndex), fd);

            case 6:
              response = _context18.sent;
              return _context18.abrupt("return", response.status === 200);

            case 8:
            case "end":
              return _context18.stop();
          }
        }
      }, _callee18);
    }));

    return function (_x8) {
      return _ref20.apply(this, arguments);
    };
  }());

  Object.assign(this, _data2);
};

var MindsDB = {
  connect: connect,
  disconnect: disconnect,
  ping: ping,
  predictors: predictors,
  dataSources: dataSources,
  DataSource: dataSource,
  Predictor: predictor
};

module.exports = MindsDB;
