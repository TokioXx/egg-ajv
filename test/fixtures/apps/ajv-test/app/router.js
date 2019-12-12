'use strict';

module.exports = app => {
  app.get('/users', 'user.index');
  app.post('/users', 'user.create');
  app.patch('/users/:id', 'user.patch');
  app.put('/users', 'user.modify');
};
