// src/setupTests.js

// ----------------- Polyfills (must run BEFORE msw is required) -----------------

// 1) Fetch API classes required by msw interceptors
/* eslint-disable import/no-extraneous-dependencies */
const { Request, Response, Headers } = require('node-fetch');
/* eslint-enable import/no-extraneous-dependencies */

global.Request = global.Request || Request;
global.Response = global.Response || Response;
global.Headers = global.Headers || Headers;

// 2) TextEncoder / TextDecoder used by msw buffer utils
const { TextEncoder, TextDecoder } = require('util');

global.TextEncoder = global.TextEncoder || TextEncoder;
global.TextDecoder = global.TextDecoder || TextDecoder;

// 3) WHATWG streams (TransformStream, ReadableStream, WritableStream)
/* eslint-disable import/no-extraneous-dependencies */
const streams = require('web-streams-polyfill/ponyfill');
/* eslint-enable import/no-extraneous-dependencies */

global.TransformStream = global.TransformStream || streams.TransformStream;
global.ReadableStream = global.ReadableStream || streams.ReadableStream;
global.WritableStream = global.WritableStream || streams.WritableStream;

// 4) Minimal BroadcastChannel polyfill (in-memory, good for tests)
function setupBroadcastChannelPolyfill() {
  if (typeof global.BroadcastChannel !== 'undefined') return;

  const channels = new Map();

  class SimpleBroadcastChannel {
    constructor(name) {
      this.name = String(name);
      this.listeners = new Set();

      if (!channels.has(this.name)) channels.set(this.name, new Set());
      channels.get(this.name).add(this);
    }

    postMessage(message) {
      const others = channels.get(this.name);
      if (!others) return;

      others.forEach((port) => {
        setTimeout(() => {
          if (typeof port.onmessage === 'function') {
            port.onmessage({ data: message });
          }

          port.listeners.forEach((listener) => {
            try {
              listener({ data: message });
            } catch (e) {
              // swallow to mimic browser channel behavior
            }
          });
        }, 0);
      });
    }

    addEventListener(_, callback) {
      if (typeof callback === 'function') this.listeners.add(callback);
    }

    removeEventListener(_, callback) {
      this.listeners.delete(callback);
    }

    close() {
      const set = channels.get(this.name);
      if (set) {
        set.delete(this);
        if (set.size === 0) channels.delete(this.name);
      }
      this.listeners.clear();
    }
  }

  global.BroadcastChannel = SimpleBroadcastChannel;
}

setupBroadcastChannelPolyfill();

// ----------------- Delayed MSW setup (after polyfills) -----------------

// Import test helpers
/* eslint-disable import/no-extraneous-dependencies */
require('@testing-library/jest-dom/extend-expect');
/* eslint-enable import/no-extraneous-dependencies */

// Import and start MSW server AFTER all globals are polyfilled
let server;
beforeAll(() => {
  /* eslint-disable global-require */
  const { server: mswServer } = require('./mocks/server');
  /* eslint-enable global-require */
  server = mswServer;
  if (server && typeof server.listen === 'function') {
    server.listen({ onUnhandledRequest: 'warn' });
  } else {
    // Log to help debug if server failed to initialize
    // eslint-disable-next-line no-console
    console.error('MSW server did not initialize properly.');
  }
});

afterEach(() => {
  if (server && typeof server.resetHandlers === 'function') server.resetHandlers();
});

afterAll(() => {
  if (server && typeof server.close === 'function') server.close();
});
