import { OpenAPIV3 } from 'openapi-types';

export enum Sex {
  Male = 'male',
  Female = 'female',
}

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
    sex: {
      type: 'string',
      enum: [Sex.Male, Sex.Female],
    },
  },
  required: ['firstName', 'lastName', 'sex'],
  additionalProperties: false,
};
