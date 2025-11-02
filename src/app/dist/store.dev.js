Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports.store = void 0;

const _toolkit = require('@reduxjs/toolkit');

const _query = require('@reduxjs/toolkit/query');
const _apiSlice = require('./api/apiSlice');

const _authSlice = _interopRequireDefault(require('../features/auth/authSlice'));

const _settingsSlice = _interopRequireDefault(require('./settings/settingsSlice'));

let _reducer;

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value,
      enumerable: true,
      configurable: true,
      writable: true,
    });
  } else {
    obj[key] = value;
  }
  return obj;
}

const store = (0, _toolkit.configureStore)({
  reducer:
    ((_reducer = {}),
    _defineProperty(_reducer, _apiSlice.apiSlice.reducerPath, _apiSlice.apiSlice.reducer),
    _defineProperty(_reducer, 'auth', _authSlice.default),
    _defineProperty(_reducer, 'settings', _settingsSlice.default),
    _reducer),
  middleware: function middleware(getDefaultMiddleware) {
    return getDefaultMiddleware().concat(_apiSlice.apiSlice.middleware);
  },
  devTools: true,
});
exports.store = store;
(0, _query.setupListeners)(store.dispatch);
