import { OpenAPIV3 } from 'openapi-types';

export const userDtoJsonSchema: OpenAPIV3.SchemaObject = {
  title: 'UserDto',
  type: 'object',
  properties: {
    firstName: {
      type: 'string',
    },
    lastName: {
      type: 'string',
    },
  },
  required: ['firstName', 'lastName'],
  additionalProperties: false,
};
