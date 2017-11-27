'use strict';

const request = require('supertest');
const mm = require('egg-mock');

describe('test/ajv.test.js', () => {
  let app;
  before(() => {
    app = mm.app({
      baseDir: 'apps/ajv-test',
    });
    return app.ready();
  });

  after(() => app.close());
  afterEach(mm.restore);

  it('should be invalid', function() {
    return request(app.callback())
      .get('/users?start=true')
      .expect(422);
  });

  it('$ref should work', function() {
    return request(app.callback())
      .post('/users')
      .send({
        id: 1,
        name: 'eggjs',
        password: 'itisawesome',
      })
      .expect(200);
  });

  it('$merge should work', function() {
    return request(app.callback())
      .patch('/users/1')
      .send({
        id: 1,
        name: 'eggjs',
        password: 'itisawesome',
        post: {
          title: 'title',
          content: 'eggjs',
        },
      })
      .expect({});
  });
});
