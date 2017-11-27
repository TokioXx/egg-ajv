'use strict';

const Ajv = require('ajv');
const extend = require('ajv-merge-patch');
const APPAJV = Symbol.for('app#ajv');


module.exports = {

  get ajv() {
    if (!this[APPAJV]) {
      const ajv = new Ajv(Object.assign({
        // v5: true,
      }, this.config.ajv));
      extend(ajv);
      this[APPAJV] = ajv;
    }

    return this[APPAJV];
  },
};
