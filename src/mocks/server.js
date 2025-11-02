// src/mocks/server.js
const mswNode = require('msw/node');

// msw/node may export setupServer directly or under .default depending on transform/interop
const setupServer = mswNode.setupServer || (mswNode.default && mswNode.default.setupServer);

if (!setupServer) {
  throw new Error('Could not find setupServer from msw/node - check transforms and jest config');
}

const handlers = require('./handlers');

const server = setupServer(...handlers);

module.exports = { server };
