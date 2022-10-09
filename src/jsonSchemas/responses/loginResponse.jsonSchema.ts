import { OpenAPIV3 } from 'openapi-types';

export const loginResponseDtoJsonSchema: OpenAPIV3.SchemaObject = {
  title: 'LoginResponseDto',
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
