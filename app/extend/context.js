'use strict';

const assert = require('assert');

module.exports = {
  /**
   * json validation
   *
   * @param {String| Object} schema string for schema id and object for Ajv rules
   * @param {Object} value default as ctx.request.body
   * @return {Object} type converted value
   */
  async validate(schema, value) {
    value = value || this.request.body;
    let validater = null;
    const { ajv } = this.app;
    if (typeof schema === 'string') {
      validater = ajv.getSchema(schema);
      assert(validater, `Schema - ${schema} - IS NOT FOUND`);
    } else {
      assert(ajv.validateSchema(schema), `Schema is not valid: ${schema}`);
      validater = ajv.compile(schema);
    }

    await validater(value);

    return value;
  },
};
