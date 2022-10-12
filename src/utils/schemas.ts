import fs from 'fs';
import { AnySchema } from 'joi';
import j2s from 'joi-to-swagger';
import { compile } from 'json-schema-to-typescript';
import { OpenAPIV3 } from 'openapi-types';

import { capitalize } from './string';

const isJsonSchema = (name: string, schema: unknown): schema is OpenAPIV3.SchemaObject => /^.+JsonSchema$/.test(name);
const isJoiSchema = (name: string, schema: unknown): schema is OpenAPIV3.SchemaObject => /^.+JoiSchema$/.test(name);

export const jsonSchemasToSwaggerSchemas = (jsonSchemas: Record<string, any>) =>
  Object.entries(jsonSchemas).reduce<Record<string, OpenAPIV3.SchemaObject>>((acc, entry) => {
    if (isJsonSchema(...entry)) {
      const [, { title, ...schema }] = entry;

      acc[title] = schema;
    }

    return acc;
  }, {});

export const joiSchemasToSwaggerSchemas = (joiSchemas: Record<string, any>) =>
  Object.entries(joiSchemas).reduce<Record<string, OpenAPIV3.SchemaObject>>((acc, entry) => {
    if (isJoiSchema(...entry)) {
      const [, schema] = entry;

      const { components } = j2s(schema);

      Object.assign(acc, components.schemas);
    }

    return acc;
  }, {});

export const joiValidatorsToSwaggerSchemas = (joiValidators: Record<string, AnySchema>) =>
  Object.entries(joiValidators).reduce<Record<string, OpenAPIV3.SchemaObject>>((acc, [name, validator]) => {
    const { swagger } = j2s(validator);

    acc[capitalize(name)] = swagger;

    return acc;
  }, {});

export const generateCompileSchema = (
  groupSchemas: Record<string, OpenAPIV3.SchemaObject>,
  schemas: Record<string, OpenAPIV3.SchemaObject>,
) => ({
  anyOf: Object.keys(groupSchemas).map((model) => ({ $ref: `#/components/schemas/${model}` })),
  components: { schemas },
});

export const generateInterfaces = (src: string, dst: string, variablesMap: Record<string, string>) =>
  import(src).then(({ swaggerSchemas: allSwaggerSchemas, ...file }) => {
    Promise.all(
      Object.entries(variablesMap).map(([variable, interfaceName]) =>
        compile(generateCompileSchema(file[variable], allSwaggerSchemas), interfaceName).then((ts) => {
          const [, match] =
            ts.match(new RegExp(`(export\\stype\\s${interfaceName}[\\s\\S]+?;)\\s*(export|$)`, 'i')) || [];

          return match;
        }),
      ),
    ).then((groupAllInterfaces) => {
      compile(generateCompileSchema(allSwaggerSchemas, allSwaggerSchemas), 'ALL').then((ts) => {
        fs.writeFileSync(dst, ts);
        fs.appendFileSync(dst, [...groupAllInterfaces, ''].join('\n'));

        console.log('Write interfaces to file');
      });
    });
  });

export const availableRequestBodyContent = (content: OpenAPIV3.MediaTypeObject) =>
  ['application/x-www-form-urlencoded', 'application/json'].reduce<OpenAPIV3.RequestBodyObject['content']>(
    (acc, mime) => {
      acc[mime] = content;

      return acc;
    },
    {},
  );

export const jsonResponseWithSchema = (responseName: string, schemaName = responseName) => ({
  [responseName]: {
    description: 'Normal response',
    content: {
      'application/json': {
        schema: {
          $ref: `#/components/schemas/${schemaName}`,
        },
      },
    },
  },
});
