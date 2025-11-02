/* eslint-disable func-names */
/* eslint-disable no-param-reassign */
/* eslint-disable no-shadow */
// file: craco.config.js

export function invokeCompatHook(hook, devServer, hookName) {
  if (typeof hook !== 'function') return;

  let lastErr = null;

  // 1) Most modern react-scripts hooks expect (devServer)
  try {
    hook(devServer);
    return;
  } catch (err) {
    lastErr = err;
  }

  // 2) Some older hooks expect (app, devServer)
  try {
    if (devServer && devServer.app) {
      hook(devServer.app, devServer);
      return;
    }
  } catch (err) {
    lastErr = err;
  }

  // 3) Some older hooks expect just (app)
  try {
    if (devServer && devServer.app) {
      hook(devServer.app);
      return;
    }
  } catch (err) {
    lastErr = err;
  }

  // 4) Try calling without arguments as a last resort
  try {
    hook();
    return;
  } catch (err) {
    lastErr = err;
  }

  // If all attempts failed, log the last error but don't crash the dev server.
  // eslint-disable-next-line no-console
  console.warn(`craco: ${hookName} invocation failed (tried multiple signatures):`, lastErr);
}

export function devServer(devServerConfig) {
  // Shallow clone to avoid mutating the incoming parameter (satisfies no-param-reassign)
  const cfg = { ...devServerConfig };

  const beforeHook = cfg.onBeforeSetupMiddleware;
  const afterHook = cfg.onAfterSetupMiddleware;
  delete cfg.onBeforeSetupMiddleware;
  delete cfg.onAfterSetupMiddleware;

  // Map legacy `https` to webpack-dev-server v5 `server` option, but don't override if server already set.
  if (cfg.https !== undefined && cfg.server === undefined) {
    const httpsVal = cfg.https;
    delete cfg.https;
    if (httpsVal) {
      if (typeof httpsVal === 'boolean') {
        cfg.server = { type: 'https' };
      } else if (typeof httpsVal === 'object') {
        cfg.server = { type: 'https', options: httpsVal };
      } else {
        cfg.server = { type: 'https' };
      }
    }
  } else {
    // remove old key if server already exists or https was undefined
    delete cfg.https;
  }

  const originalSetup = cfg.setupMiddlewares;

  cfg.setupMiddlewares = (middlewares, devServer) => {
    // Ensure middlewares is an array without using a default parameter (fixes eslint default-param-last)
    middlewares = middlewares ?? [];

    // --- compatibility shim: ensure devServer.close exists ---
    if (devServer && typeof devServer.close !== 'function') {
      // 1) If v5 Server exposes stop() (returns Promise), provide close(cb) that calls stop()
      if (typeof devServer.stop === 'function') {
        devServer.close = function (cb) {
          const p = devServer.stop();
          if (typeof cb === 'function') {
            p.then(() => cb()).catch((err) => cb(err));
          }
          return p;
        };
      }
      // 2) Otherwise, if there's an underlying http server with close(cb)
      else if (devServer.server && typeof devServer.server.close === 'function') {
        devServer.close = function (cb) {
          return devServer.server.close(cb);
        };
      }
      // 3) As a last resort, no-op close to avoid crashes (logs a warning)
      else {
        devServer.close = function (cb) {
          // eslint-disable-next-line no-console
          console.warn(
            'craco: devServer.close() called but no close/stop method found on devServer'
          );
          if (typeof cb === 'function') cb();
          return Promise.resolve();
        };
      }
    }

    // Call the before hook with compatibility attempts
    invokeCompatHook(beforeHook, devServer, 'onBeforeSetupMiddleware');

    // Preserve existing setupMiddlewares behaviour (allow it to replace the middlewares array)
    if (typeof originalSetup === 'function') {
      try {
        const maybe = originalSetup(middlewares, devServer);
        if (Array.isArray(maybe)) middlewares = maybe;
      } catch (err) {
        // eslint-disable-next-line no-console
        console.warn('craco: existing setupMiddlewares invocation failed:', err);
      }
    }

    // Example debug route — only add if app exists and in development
    if (
      process.env.NODE_ENV === 'development' &&
      devServer &&
      devServer.app &&
      typeof devServer.app.get === 'function'
    ) {
      devServer.app.get('/setup-middleware/some/path', (_, res) => {
        res.send('setup-middlewares option GET (via CRACO)');
      });
    }

    // Call the after hook with compatibility attempts
    invokeCompatHook(afterHook, devServer, 'onAfterSetupMiddleware');

    return middlewares;
  };

  return cfg;
}
