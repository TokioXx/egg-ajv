'use strict';

module.exports = {
  properties: {
    title: {
      type: 'string',
    },
    content: {
      type: 'string',
    },
  },
  required: [ 'title', 'content' ],
  $async: true,
  additionalProperties: false,
};
