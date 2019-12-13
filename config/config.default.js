'use strict';

/**
 * egg-ajv default config
 * @member Config#ajv
 * @property {String} SOME_KEY - some description
 */
exports.ajv = {
  keyword: 'schema',
  removeAdditional: true, // https://github.com/epoberezkin/ajv#filtering-data
  useDefaults: true, // https://github.com/epoberezkin/ajv#assigning-defaults
  coerceTypes: true, // https://github.com/epoberezkin/ajv#coercing-data-types
  keepErrors: false,
  singleError: false,
};
