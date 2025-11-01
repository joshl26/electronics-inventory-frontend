// file: craco-dev-server.js

export function devServer(devServerConfig) {
  // --- 1) map old onBefore/onAfter hooks to setupMiddlewares (avoid validation errors) ---
  const beforeHook = devServerConfig.onBeforeSetupMiddleware;
  const afterHook = devServerConfig.onAfterSetupMiddleware;
  delete devServerConfig.onBeforeSetupMiddleware;
  delete devServerConfig.onAfterSetupMiddleware;

  // --- 2) map old `https` option to v5 `server` option ---
  // Accepts:
  // - boolean true  -> { type: 'https' }
  // - object { key, cert, ca, passphrase, pfx } -> { type: 'https', options: <that object> }
  if (devServerConfig.https !== undefined) {
    const httpsVal = devServerConfig.https;
    delete devServerConfig.https;

    if (httpsVal) {
      if (typeof httpsVal === "boolean") {
        devServerConfig.server = { type: "https" };
      } else if (typeof httpsVal === "object") {
        devServerConfig.server = { type: "https", options: httpsVal };
      } else {
        // fallback: enable https
        devServerConfig.server = { type: "https" };
      }
    }
  }

  // --- 3) provide setupMiddlewares that calls old hooks and allows adding custom middleware ---
  devServerConfig.setupMiddlewares = (middlewares, devServer) => {
    // call before hook (if present)
    if (typeof beforeHook === "function") {
      try {
        beforeHook(devServer);
      } catch (err) {
        // non-fatal
        // eslint-disable-next-line no-console
        console.warn(
          "craco: onBeforeSetupMiddleware hook invocation failed:",
          err
        );
      }
    }

    // example: preserve any existing custom routes or add your own
    if (devServer && devServer.app) {
      devServer.app.get("/setup-middleware/some/path", (_, res) => {
        res.send("setup-middlewares option GET (via CRACO)");
      });
    }

    // call after hook (if present)
    if (typeof afterHook === "function") {
      try {
        afterHook(devServer);
      } catch (err) {
        // eslint-disable-next-line no-console
        console.warn(
          "craco: onAfterSetupMiddleware hook invocation failed:",
          err
        );
      }
    }

    return middlewares;
  };

  return devServerConfig;
}
