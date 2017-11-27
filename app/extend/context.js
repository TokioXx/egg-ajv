'use strict';

const assert = require('assert');

module.exports = {

  /**
   * json validation
   *
   * @param {string|object} schema string for schema id and object for Ajv rules
   * @param {any} value default as ctx.request.body
   * @return {undefine} throw an exception instead
   */
  async validate(schema, value) {
    let validater = null;
    const { ajv } = this.app;
    if (typeof schema === 'string') {
      validater = ajv.getSchema(schema);
      assert(validater, `Schema - ${schema} - IS NOT FOUND`);
    } else {
      assert(ajv.validateSchema(schema), `Schema is not valid: ${schema}`);
      validater = ajv.compile(schema);
    }

    return validater(value || this.ctx.request.body || {});
  },
};
