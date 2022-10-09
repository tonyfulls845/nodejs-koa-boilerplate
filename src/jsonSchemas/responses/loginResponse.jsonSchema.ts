import { OpenAPIV3 } from 'openapi-types';

export const loginResponseJsonSchema: OpenAPIV3.SchemaObject = {
  title: 'LoginResponse',
  type: 'object',
  properties: {
    token: {
      type: 'string',
    },
    user: {
      $ref: '#/components/schemas/UserDto',
    },
  },
  required: ['token', 'user'],
  additionalProperties: false,
};
