'use strict';

const request = require('supertest');
const mm = require('egg-mock');
const assert = require('assert');

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

  it('custom error message', function() {
    return request(app.callback())
      .get('/users?start=-1')
      .expect(422)
      .expect(resp => {
        assert.equal(resp.body.errors[0].message, 'start should be an integer bigger or equal to 0, current value (-1) is invalid');
      });
  });

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

  it('without second params should work', function() {
    return request(app.callback())
      .put('/users')
      .send({
        id: 1,
        name: 'eggjs',
        password: 'itisawesome',
      })
      .expect(200);
  });

});
