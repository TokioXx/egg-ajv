'use strict';

module.exports = {
  properties: {
    id: {
      $ref: 'schema.definition#/int',
    },
    name: {
      type: 'string',
    },
    password: {
      type: 'string',
    },
  },
  required: [ 'name', 'password', 'id' ],
  $async: true,
  additionalProperties: false,
};
