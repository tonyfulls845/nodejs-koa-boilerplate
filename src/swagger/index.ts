import { OpenAPIV3 } from 'openapi-types';

import { HOST, PORT } from '../config';
import { schemas } from '../modules/schemas';

const availableRequestBodyContent = (content: OpenAPIV3.MediaTypeObject) =>
  ['application/x-www-form-urlencoded', 'application/json'].reduce<OpenAPIV3.RequestBodyObject['content']>(
    (acc, mime) => {
      acc[mime] = content;

      return acc;
    },
    {},
  );

export const oasV3: OpenAPIV3.Document = {
  openapi: '3.0.1',
  info: {
    title: 'NodeJS Training API',
    description: 'Swagger with auto generate models from Joi schemas',
    version: 'v1',
  },
  servers: [{ url: `http://${HOST}:${PORT}/api` }],
  paths: {
    '/auth/register': {
      post: {
        tags: ['auth'],
        summary: 'Register new user',
        requestBody: {
          content: availableRequestBodyContent({
            schema: {
              $ref: '#/components/schemas/RegisterRequestModel',
            },
          }),
        },
        responses: {
          200: {
            $ref: '#/components/responses/ApiResponse',
          },
        },
      },
    },
    '/auth/login': {
      post: {
        tags: ['auth'],
        summary: 'Login',
        requestBody: {
          content: availableRequestBodyContent({
            schema: {
              $ref: '#/components/schemas/LoginRequestModel',
            },
          }),
        },
        responses: {
          200: {
            $ref: '#/components/responses/ApiResponse',
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
              $ref: '#/components/schemas/CreatePostRequestModel',
            },
          }),
        },
        responses: {
          200: {
            $ref: '#/components/responses/ApiResponse',
          },
        },
      },
    },
  },
  components: {
    schemas,
    responses: {
      ApiResponse: {
        description: 'Normal response (either success or error)',
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                code: {
                  type: 'integer',
                  format: 'int32',
                },
                type: {
                  type: 'string',
                },
                message: {
                  type: 'string',
                },
              },
            },
          },
        },
      },
    },
    securitySchemes: {
      BearerAuth: {
        type: 'http',
        scheme: 'bearer',
      },
    },
  },
};
