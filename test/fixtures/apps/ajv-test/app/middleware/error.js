'use strict';

const { ValidationError } = require('ajv');

module.exports = () => function* (next) {
  try {
    yield next;
  } catch (e) {
    if (e instanceof ValidationError) {
      this.body = {
        code: 422,
        msg: '请求参数错误',
        errors: e.errors,
      };
      this.status = 422;
    } else {
      throw e;
    }
  }
};
