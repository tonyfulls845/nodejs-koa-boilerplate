import { AnySchema } from 'joi';
import j2s from 'joi-to-swagger';
import { OpenAPIV3 } from 'openapi-types';

import * as joiValidators from '../joiValidators';
import * as authJoiSchemas from '../modules/auth/joiSchemas';
import * as postJoiSchemas from '../modules/post/joiSchemas';
import { capitalize } from '../utils/string';

import * as modelsJsonSchemas from './models';
import * as responsesJsonSchemas from './responses';

const modulesJoiSchemas = {
  ...authJoiSchemas,
  ...postJoiSchemas,
};

const validatorsJsonSchemas = Object.entries(joiValidators).reduce<Record<string, OpenAPIV3.SchemaObject>>(
  (acc, [name, validator]) => {
    const { swagger } = j2s(validator);

    acc[capitalize(name.replace('JoiValidator', ''))] = swagger;

    return acc;
  },
  {},
);

const commonJsonSchemas = Object.values({ ...modelsJsonSchemas, ...responsesJsonSchemas }).reduce<
  Record<string, OpenAPIV3.SchemaObject>
>((acc, { title, ...schema }) => {
  acc[title] = schema;

  return acc;
}, {});

const modulesJsonSchemas = Object.entries(modulesJoiSchemas)
  .filter(([name]) => /^.+JoiSchema$/.test(name))
  .reduce<Record<string, OpenAPIV3.SchemaObject>>((acc, [, schema]) => {
    const { components } = j2s(schema as AnySchema);

    return {
      ...acc,
      ...components.schemas,
    };
  }, {});

export const jsonSchemas = {
  ...modulesJsonSchemas,
  ...commonJsonSchemas,
  ...validatorsJsonSchemas,
};
