import { OpenAPIV3 } from 'openapi-types';

import { HOST, PORT } from '../config';
import {apiPrefix, routes, routesParams} from '../constants/routes';
import { swaggerSchemas } from '../jsonSchemas';
import { availableRequestBodyContent, idParameterSchema, jsonResponseWithSchema } from '../utils/schemas';

export const oasV3: OpenAPIV3.Document = {
  openapi: '3.0.1',
  info: {
    title: 'NodeJS Training API',
    description: 'Swagger with auto generate models from Joi validators',
    version: 'v1',
  },
  servers: [{ url: `http://${HOST}:${PORT}${apiPrefix}` }],
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
    [routes.login]: {
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
    [routes.me]: {
      get: {
        tags: ['auth'],
        summary: 'Me',
        security: [
          {
            BearerAuth: [],
          },
        ],
        responses: {
          200: {
            $ref: '#/components/responses/UserResponseDto',
          },
        },
      },
    },
    [`${routes.user}/{${routesParams.user}`]: {
      get: {
        tags: ['auth'],
        summary: 'Get user by id',
        security: [
          {
            BearerAuth: [],
          },
        ],
        parameters: [
          {
            $ref: '#/components/parameters/User',
          },
        ],
        responses: {
          200: {
            $ref: '#/components/responses/UserResponseDto',
          },
        },
      },
      put: {
        tags: ['auth'],
        summary: 'Update user by id',
        security: [
          {
            BearerAuth: [],
          },
        ],
        requestBody: {
          content: availableRequestBodyContent({
            schema: {
              $ref: '#/components/schemas/UserDto',
            },
          }),
        },
        parameters: [
          {
            $ref: '#/components/parameters/User',
          },
        ],
        responses: {
          200: {
            $ref: '#/components/responses/UserResponseDto',
          },
        },
      },
    },
    [routes.post]: {
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
    [`${routes.post}/{${routesParams.post}`]: {
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
      Post: idParameterSchema('post'),
      User: idParameterSchema('user'),
    },
    responses: {
      ...jsonResponseWithSchema('RegisterResponseDto', 'UserDto'),
      ...jsonResponseWithSchema('LoginResponseDto'),
      ...jsonResponseWithSchema('CreatePostResponseDto', 'PostDto'),
      ...jsonResponseWithSchema('UserResponseDto', 'UserDto'),

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
