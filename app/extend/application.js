'use strict';

const Ajv = require('ajv');
const APPAJV = Symbol.for('app#ajv');


module.exports = {

  get ajv() {
    if (!this[APPAJV]) {
      const config = this.config.ajv;
      const ajv = new Ajv(Object.assign({
        allErrors: true,    // required for custom error message
        jsonPointers: true,  // required for custom error message
      }, config));
      require('ajv-merge-patch')(ajv);
      require('ajv-errors')(ajv, {
        keepErrors: config.keepErrors || false,
        singleError: config.singleError || false,
      });
      this[APPAJV] = ajv;
    }

    return this[APPAJV];
  },
};
