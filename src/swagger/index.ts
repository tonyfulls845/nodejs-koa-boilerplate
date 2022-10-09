import { OpenAPIV3 } from 'openapi-types';

import { HOST, PORT } from '../config';
import { jsonSchemas } from '../jsonSchemas';

const availableRequestBodyContent = (content: OpenAPIV3.MediaTypeObject) =>
  ['application/x-www-form-urlencoded', 'application/json'].reduce<OpenAPIV3.RequestBodyObject['content']>(
    (acc, mime) => {
      acc[mime] = content;

      return acc;
    },
    {},
  );

const response = (responseName: string, schemaName = responseName) => ({
  [responseName]: {
    description: 'Normal response (either success or error)',
    content: {
      'application/json': {
        schema: {
          $ref: `#/components/schemas/${schemaName}`,
        },
      },
    },
  },
});

export const oasV3: OpenAPIV3.Document = {
  openapi: '3.0.1',
  info: {
    title: 'NodeJS Training API',
    description: 'Swagger with auto generate models from Joi joiSchemas',
    version: 'v1',
  },
  servers: [{ url: `http://${HOST}:${PORT}/api` }],
  paths: {
    '/register': {
      post: {
        tags: ['auth'],
        summary: 'Register new user',
        requestBody: {
          content: availableRequestBodyContent({
            schema: {
              $ref: '#/components/schemas/RegisterRequestDto',
            },
          }),
        },
        responses: {
          200: {
            $ref: '#/components/responses/RegisterResponseDto',
          },
        },
      },
    },
    '/login': {
      post: {
        tags: ['auth'],
        summary: 'Login',
        requestBody: {
          content: availableRequestBodyContent({
            schema: {
              $ref: '#/components/schemas/LoginRequestDto',
            },
          }),
        },
        responses: {
          200: {
            $ref: '#/components/responses/LoginResponseDto',
          },
        },
      },
    },
    '/post': {
      post: {
        tags: ['post'],
        summary: 'Add new post',
        security: [
          {
            BearerAuth: [],
          },
        ],
        requestBody: {
          content: availableRequestBodyContent({
            schema: {
              $ref: '#/components/schemas/CreatePostRequestDto',
            },
          }),
        },
        responses: {
          200: {
            $ref: '#/components/responses/CreatePostResponseDto',
          },
        },
      },
    },
  },
  components: {
    schemas: jsonSchemas,
    responses: {
      ...response('RegisterResponseDto', 'UserDto'),
      ...response('LoginResponseDto'),
      ...response('CreatePostResponseDto', 'PostDto'),
    },
    securitySchemes: {
      BearerAuth: {
        type: 'http',
        scheme: 'bearer',
      },
    },
  },
};
