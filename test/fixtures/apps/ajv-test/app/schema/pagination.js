'use strict';

module.exports = {
  properties: {
    start: {
      type: 'number',
      minimun: 0,
      defualt: 0,
    },
    count: {
      type: 'number',
      minimun: 0,
      maximun: 0,
      defualt: 10,
    },
    sort: {
      type: 'string',
      defualt: 'true',
    },
  },
  errorMessage: {
    properties: {
      start: 'start should be an integer bigger or equal to 0, current value (${/start}) is invalid',
      count: 'count should be an integer bigger or equal to 1, current value (${/count}) is invalid',
    },
  },
  $async: true,
};
