'use strict';

const assert = require('assert');
const {
  join,
} = require('path');

module.exports = app => {
  const { keyword = 'schema' } = app.config.ajv || {};
  app.loader.loadToApp(join(app.baseDir, `app/${keyword}`), keyword, {
    initializer(exp, { path, pathName }) {
      assert(app.ajv.validateSchema(exp), `${path} should be a valid schema`);
      app.ajv.addSchema(Object.assign({ $id: pathName }, exp), pathName);
      return exp;
    },
  });

};
