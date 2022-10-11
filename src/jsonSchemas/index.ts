import * as joiValidators from '../joiValidators';
import * as authJoiSchemas from '../modules/auth/joiSchemas';
import * as postJoiSchemas from '../modules/post/joiSchemas';
import {
  joiSchemasToSwaggerSchemas,
  joiValidatorsToSwaggerSchemas,
  jsonSchemasToSwaggerSchemas,
} from '../utils/schemas';

import * as modelsJsonSchemas from './models';
import * as responsesJsonSchemas from './responses';

const modulesJoiSchemas = {
  ...authJoiSchemas,
  ...postJoiSchemas,
};

export const validatorsSwaggerSchemas = joiValidatorsToSwaggerSchemas(joiValidators);
export const modelsSwaggerSchemas = jsonSchemasToSwaggerSchemas(modelsJsonSchemas);
export const responsesSwaggerSchemas = jsonSchemasToSwaggerSchemas(responsesJsonSchemas);
export const modulesSwaggerSchemas = joiSchemasToSwaggerSchemas(modulesJoiSchemas);

export const swaggerSchemas = {
  ...modelsSwaggerSchemas,
  ...responsesSwaggerSchemas,
  ...validatorsSwaggerSchemas,
  ...modulesSwaggerSchemas,
};
