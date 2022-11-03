import { OpenAPIV3 } from 'openapi-types';

export const roleDtoJsonSchema: OpenAPIV3.SchemaObject = {
  title: 'RoleDto',
  type: 'object',
  properties: {
    code: {
      type: 'string',
    },
  },
  required: ['code'],
  additionalProperties: false,
};
