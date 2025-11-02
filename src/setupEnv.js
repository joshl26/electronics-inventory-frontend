// src/setupEnv.js
// This file runs before any modules are loaded (via jest.setupFiles).
// It polyfills fetch + Request/Response/Headers and other browser-ish globals.

/* eslint-disable import/no-extraneous-dependencies */
const nodeFetch = require('node-fetch');
// v2 (CommonJS)
const { Request, Response, Headers } = nodeFetch;
global.fetch = global.fetch || nodeFetch;
global.Request = global.Request || Request;
global.Response = global.Response || Response;
global.Headers = global.Headers || Headers;

// TextEncoder / TextDecoder used by msw buffer utils
const { TextEncoder, TextDecoder } = require('util');

global.TextEncoder = global.TextEncoder || TextEncoder;
global.TextDecoder = global.TextDecoder || TextDecoder;

// WHATWG streams (TransformStream, ReadableStream, WritableStream)
const streams = require('web-streams-polyfill/ponyfill');
/* eslint-enable import/no-extraneous-dependencies */

global.TransformStream = global.TransformStream || streams.TransformStream;
global.ReadableStream = global.ReadableStream || streams.ReadableStream;
global.WritableStream = global.WritableStream || streams.WritableStream;

// Minimal BroadcastChannel polyfill for MSW (in-memory)
if (typeof global.BroadcastChannel === 'undefined') {
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
          if (typeof port.onmessage === 'function') port.onmessage({ data: message });
          port.listeners.forEach((listener) => {
            try {
              listener({ data: message });
            } catch (e) {
              /* swallow */
            }
          });
        }, 0);
      });
    }

    addEventListener(_, cb) {
      if (typeof cb === 'function') this.listeners.add(cb);
    }

    removeEventListener(_, cb) {
      this.listeners.delete(cb);
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
