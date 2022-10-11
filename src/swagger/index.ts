import { OpenAPIV3 } from 'openapi-types';

import { HOST, PORT } from '../config';
import { swaggerSchemas } from '../jsonSchemas';
import { availableRequestBodyContent, jsonResponseWithSchema } from '../utils/schemas';

export const oasV3: OpenAPIV3.Document = {
  openapi: '3.0.1',
  info: {
    title: 'NodeJS Training API',
    description: 'Swagger with auto generate models from Joi validators',
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
    '/post/{post}': {
      delete: {
        tags: ['post'],
        summary: 'Delete post with given id',
        parameters: [
          {
            $ref: '#/components/parameters/Post',
          },
        ],
        security: [
          {
            BearerAuth: [],
          },
        ],
        responses: {
          200: {
            $ref: '#/components/responses/SuccessResponse',
          },
        },
      },
    },
  },
  components: {
    schemas: swaggerSchemas,
    parameters: {
      Post: {
        name: 'post',
        in: 'path',
        schema: {
          $ref: '#/components/schemas/IdValidator',
        },
      },
    },
    responses: {
      ...jsonResponseWithSchema('RegisterResponseDto', 'UserDto'),
      ...jsonResponseWithSchema('LoginResponseDto'),
      ...jsonResponseWithSchema('CreatePostResponseDto', 'PostDto'),
      SuccessResponse: {
        description: 'Success Response',
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
