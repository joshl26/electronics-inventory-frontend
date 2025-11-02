// src/mocks/handlers.js
// MSW handlers that are resilient to module interop and request shape differences.

/* eslint-disable import/no-extraneous-dependencies */
const msw = require('msw');
/* eslint-enable import/no-extraneous-dependencies */

// msw v2 may expose request helpers under `rest` or `http`
const rest = msw.rest || msw.http;

if (!rest) {
  throw new Error('Could not find msw.rest or msw.http on msw package');
}

const API_BASE = process.env.REACT_APP_API_BASE || '';

// Escape a string for use in a RegExp
function escapeForRegExp(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

// Build auth matcher: either include API_BASE or fallback to matching any path ending in /auth
const authMatcher = API_BASE
  ? new RegExp(`${escapeForRegExp(API_BASE.replace(/\/$/, ''))}/auth$`)
  : /\/auth$/;

// Helper to parse body defensively (JSON, text, urlencoded, FormData, already-parsed)
async function parseBody(req) {
  // If MSW already parsed it (node-ish), return it
  if (req && req.body && Object.keys(req.body).length) return req.body;

  // If request exposes json()
  if (typeof req.json === 'function') {
    try {
      const parsed = await req.json();
      if (parsed && Object.keys(parsed).length) return parsed;
    } catch {
      // ignore
    }
  }

  // If request exposes text() (could be a JSON string or urlencoded)
  if (typeof req.text === 'function') {
    try {
      const txt = await req.text();
      if (!txt) return {};
      // Try parse JSON
      try {
        return JSON.parse(txt);
      } catch {
        // ignore JSON parse error
        // Try urlencoded
        try {
          const params = new URLSearchParams(txt);
          const obj = Object.fromEntries(params);
          if (Object.keys(obj).length) return obj;
        } catch {
          // ignore urlencoded parse error
          // fallback: return raw text
          return { _raw: txt };
        }
      }
    } catch {
      // ignore
    }
  }

  // FormData support
  if (typeof req.formData === 'function') {
    try {
      const fd = await req.formData();
      const entries = Array.from(fd.entries());
      if (entries.length) return Object.fromEntries(entries);
    } catch {
      // ignore
    }
  }

  return {};
}

module.exports = [
  // Auth: match any URL ending with /auth (respecting REACT_APP_API_BASE if set)
  rest.post(authMatcher, async (req, res, ctx) => {
    const body = await parseBody(req);
    const usernameOrEmail = body?.username || body?.email;
    const password = body?.password;

    // Enable when debugging test requests:
    // if (process.env.MSW_DEBUG === 'true') console.log('MSW /auth request -> url:', req.url?.href, 'body:', body);

    if (usernameOrEmail === 'test@x.com' && password === 'password') {
      return res(
        ctx.status(200),
        ctx.json({
          accessToken: 'fake-jwt-token',
          user: { name: 'Test User', roles: ['User'] },
        })
      );
    }

    return res(ctx.status(401), ctx.json({ message: 'Unauthorized' }));
  }),

  // GET /parts -> list parts
  rest.get(new RegExp(`${escapeForRegExp(API_BASE)}/parts$`), (req, res, ctx) => {
    const parts = [
      { _id: '1', name: 'Resistor', qty: 100 },
      { _id: '2', name: 'Capacitor', qty: 50 },
    ];
    return res(ctx.status(200), ctx.json(parts));
  }),

  // POST /parts -> create a part (echo back). For deterministic tests you may want to return a fixed id.
  rest.post(new RegExp(`${escapeForRegExp(API_BASE)}/parts$`), async (req, res, ctx) => {
    const body = await parseBody(req);
    // If you want deterministic tests, you could use a counter or fixed id instead of Date.now()
    const newPart = { _id: String(Date.now()), ...body };
    return res(ctx.status(201), ctx.json(newPart));
  }),
];
