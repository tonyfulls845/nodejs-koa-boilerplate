import { AnySchema } from 'joi';
import j2s from 'joi-to-swagger';
import { OpenAPIV3 } from 'openapi-types';

import * as authJoiSchemas from '../modules/auth/joiSchemas';
import * as postJoiSchemas from '../modules/post/joiSchemas';

import * as modelsJsonSchemas from './models';

const modulesJoiSchemas = {
  ...authJoiSchemas,
  ...postJoiSchemas,
};

export const jsonSchemas = Object.entries(modulesJoiSchemas)
  .filter(([name]) => /^.+JoiSchema$/.test(name))
  .reduce<Record<string, OpenAPIV3.SchemaObject>>(
    (acc, [, schema]) => {
      const { components } = j2s(schema as AnySchema);

      return {
        ...acc,
        ...components.schemas,
      };
    },
    Object.values(modelsJsonSchemas).reduce<Record<string, OpenAPIV3.SchemaObject>>((acc, { title, ...schema }) => {
      acc[title] = schema;

      return acc;
    }, {}),
  );
