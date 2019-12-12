'use strict';

module.exports = {
  properties: {
    start: {
      type: 'number',
      minimum: 0,
      default: 0,
    },
    count: {
      type: 'number',
      minimum: 0,
      default: 10,
    },
    sort: {
      type: 'string',
      default: 'true',
    },
  },
  errorMessage: {
    properties: {
      start:
        'start should be an integer bigger or equal to 0, current value (${/start}) is invalid',
      count:
        'count should be an integer bigger or equal to 1, current value (${/count}) is invalid',
    },
  },
  $async: true,
};
