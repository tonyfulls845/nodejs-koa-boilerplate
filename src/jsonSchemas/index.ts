import * as joiValidators from '../joiValidators';
import * as authJoiSchemas from '../modules/auth/joiSchemas';
import * as postJoiSchemas from '../modules/post/joiSchemas';
import * as userJoiSchemas from '../modules/user/joiSchemas';
import {
  joiSchemasToSwaggerSchemas,
  joiValidatorsToSwaggerSchemas,
  jsonSchemasToSwaggerSchemas,
  sortSchemas,
} from '../utils/schemas';

import * as modelsJsonSchemas from './models';
import * as responsesJsonSchemas from './responses';

const modulesJoiSchemas = {
  ...authJoiSchemas,
  ...postJoiSchemas,
  ...userJoiSchemas,
};

const validatorsSwaggerSchemas = joiValidatorsToSwaggerSchemas(joiValidators);
const modelsSwaggerSchemas = jsonSchemasToSwaggerSchemas(modelsJsonSchemas);
const responsesSwaggerSchemas = jsonSchemasToSwaggerSchemas(responsesJsonSchemas);
const modulesSwaggerSchemas = joiSchemasToSwaggerSchemas(modulesJoiSchemas);

export const swaggerSchemas = sortSchemas({
  ...modelsSwaggerSchemas,
  ...responsesSwaggerSchemas,
  ...validatorsSwaggerSchemas,
  ...modulesSwaggerSchemas,
});
