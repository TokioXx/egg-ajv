'use strict';

module.exports = app => {
  class UserController extends app.Controller {
    async index() {
      await this.ctx.validate('schema.pagination', this.ctx.request.query);
      this.ctx.body = {};
    }

    async create() {
      await this.ctx.validate('schema.user', this.ctx.request.body);
      this.ctx.body = {};
    }

    get patchRule() {
      return {
        $async: true,
        $merge: {
          source: {
            properties: {
              user: { $ref: 'schema.user#' },
            },
          },
          with: {
            properties: {
              post: {
                $ref: 'schema.sub.post#',
              },
            },
            // array would be overrided instead of merged
            required: [ 'post', 'name' ],
          },
        },
      };
    }

    async patch() {
      await this.ctx.validate(this.patchRule, this.ctx.request.body);
      this.ctx.body = {};
    }

    async modify() {
      // without second arg
      await this.ctx.validate('schema.user');
      this.ctx.body = {};
    }

  }

  return UserController;
};
