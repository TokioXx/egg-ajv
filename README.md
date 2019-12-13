# egg-ajv

The validater based on [ajv](https://github.com/epoberezkin/ajv) for egg.js.

Egg-ajv consider each schema as a small piece, which compose a complete schema by using the key words - [\$ref](https://github.com/epoberezkin/ajv#combining-schemas-with-ref), [\$merge and \$patch](https://github.com/epoberezkin/ajv#merge-and-patch-keywords) - to reduce the code repetition.

## Install

```bash
$ npm i egg-ajv --save
```

## Usage & configuration

- Enable plugin in `config/plugin.js`

```js
exports.ajv = {
  enable: true,
  package: "egg-ajv"
};
```

- Edit your own configurations in `config/config.{env}.js`

```javascript
config.ajv = {
  /**
   * default: "schema"
   * to indicate the namespace and path of schemas, default as 'schema'
   */
  keyword: "schema",
  /**
   * default: true
   * see https://github.com/epoberezkin/ajv#filtering-data
   */
  removeAdditional: true,
  /**
   * default: true
   * see https://github.com/epoberezkin/ajv#assigning-defaults
   */
  useDefaults: true,
  /**
   * default: true
   * see https://github.com/epoberezkin/ajv#coercing-data-types
   */
  coerceTypes: true,
  /**
   * default: false
   * see https://github.com/epoberezkin/ajv-errors#options
   */
  keepErrors: false,
  /**
   * default: false
   * see https://github.com/epoberezkin/ajv-errors#options
   */
  singleError: false
};
```

And all [the options of Ajv](https://github.com/epoberezkin/ajv#options) is supported.

## API

```javascript
  /**
   * json validation
   *
   * @param {String| Object} schema string for schema id and object for Ajv rules
   * @param {Object} value default as ctx.request.body
   * @return {Object} type converted value
   */
  async validate(schema, value) {}
```

## Usage

We need to put our schemas at the `/app/${config.ajv.keyword}` directory, which would be automaticlly loaded into the instance of Ajv accessed by `app.ajv`. To make it simple, we persumed that the keyword is 'schema'.

**Each file is designated an id based on it's path, such as the id of `app/schema/a/b.js` is `schema.a.b`**

#### A Simple Example:

```javascript
// app/schema/definition.js

module.exports = {
  int: { type: "integer" },
  str: { type: "string" }
};

// app/schema/user.js

module.exports = {
  properties: {
    id: {
      $ref: "schema.definition#/int"
    },
    name: {
      type: "string"
    },
    password: {
      type: "string"
    }
  },
  required: ["name", "password", "id"],
  $async: true,
  additionalProperties: false
};

// app/controller/user.js

exports.create = async ctx => {
  await this.ctx.validate("schema.pagination", this.ctx.request.body);
};
```

#### Another Example with the use of \$merge

```javascript
// app/schema/user.js

module.exports = {
  properties: {
    name: {
      type: "string"
    },
    password: {
      type: "string"
    }
  },
  required: ["name", "password"],
  $async: true,
  additionalProperties: false
};

// app/controller/user.js

const rule = {
  $async: true,
  $merge: {
    source: {
      properties: {
        user: { $ref: "schema.user#" }
      }
    },
    with: {
      properties: {
        age: {
          type: "number"
        }
      },
      // array would be overrided instead of merged
      required: ["password", "name", "age"]
    }
  }
};

exports.create = async ctx => {
  await this.ctx.validate(rule, this.ctx.request.body);
  // or
  await this.ctx.validate(this.app.schema.user);
};
```

### Custom Error Message

```JSON
{
  "type": "object",
  "properties": {
    "size": {
      "type": "number",
      "minimum": 4
    }
  },
  "errorMessage": {
    "properties": {
      "size": "size should be a number bigger or equal to 4, current value is ${/size}"
    }
  }
}
```

check detail at [ajv-errors](https://github.com/epoberezkin/ajv-errors)

### Exception

An exception will be thrown when a validation failed, so we'd better catch it at the middleware, but Egg-ajv doesn't do it for the sake of expansibility.

Try something like this:

```javascript
// app/middleware/error.js
const { ValidationError } = require("egg-ajv/error");

module.exports = () =>
  function*(next) {
    try {
      yield next;
    } catch (e) {
      if (e instanceof ValidationError) {
        this.body = {
          code: 422,
          msg: "请求参数错误",
          errors: e.errors
        };
        this.status = 422;
      } else {
        throw e;
      }
    }
  };
```

Or catch the error by `onerror` in `config/config.{env}.js` files

```js
// config/config.default.js
const { ValidationError } = require("egg-ajv/error");

exports.onerror = {
  all: (e, ctx) => {
    if (e instanceof ValidationError) {
      ctx.body = JSON.stringify(e.errors);
      ctx.status = 422;
    }
  }
};
```

For more information, check the [test app example](./test/fixtures/apps/ajv-test)
