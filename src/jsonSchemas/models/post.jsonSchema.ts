import { OpenAPIV3 } from 'openapi-types';

export const postDtoJsonSchema: OpenAPIV3.SchemaObject = {
  title: 'PostDto',
  type: 'object',
  properties: {
    message: {
      type: 'string',
    },
    user: {
      $ref: '#/components/schemas/UserDto',
    },
  },
  required: ['message', 'user'],
  additionalProperties: false,
};
