import { AnySchema } from 'joi';
import j2s from 'joi-to-swagger';

import * as authSchemas from './auth/schemas';
import * as postSchemas from './post/schemas';

const joiSchemas = {
  ...authSchemas,
  ...postSchemas,
};

export const schemas = Object.entries(joiSchemas)
  .filter(([name]) => /^.+Schema$/.test(name))
  .reduce((acc, [, schema]) => {
    const { components } = j2s(schema as AnySchema);

    return {
      ...acc,
      ...components.schemas,
    };
  }, {});
