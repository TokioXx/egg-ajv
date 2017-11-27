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
  $async: true,
};
