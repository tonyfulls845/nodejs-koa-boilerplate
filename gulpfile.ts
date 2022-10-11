import * as gulp from 'gulp';
import path from 'path';

import { generateInterfaces } from './src/utils/schemas';

const joiSchemasRoutes = `./src/modules/**/joiSchemas/*joiSchema.ts`;
const jsonSchemasRoutes = `./src/jsonSchemas/**/*jsonSchema.ts`;
const joiValidatorsRoutes = `./src/joiValidators/*.joiValidator.ts`;

const jsonSchemasPath = path.resolve('./src/jsonSchemas');

gulp.task('schema', (done) => {
  Object.keys(require.cache)
    .filter((path) => {
      return /src[\\/]modules[\\/].+[\\/]joiSchemas/i.test(path) || /src[\\/]jsonSchemas/i.test(path);
    })
    .forEach((path) => {
      console.log(`Clear require cache ${path}`);
      delete require.cache[path];
    });

  generateInterfaces(jsonSchemasPath, `${jsonSchemasPath}/interfaces.ts`, {
    modelsSwaggerSchemas: 'AnyModel',
    responsesSwaggerSchemas: 'AnyResponse',
    modulesSwaggerSchemas: 'AnyModuleRequest',
    validatorsSwaggerSchemas: 'AnyValidator',
  }).then(() => done());
});

// Watch Task
gulp.task('watch-schema', function () {
  gulp.watch([joiSchemasRoutes, jsonSchemasRoutes, joiValidatorsRoutes], gulp.series('schema'));
});

// Default Task
gulp.task('default', gulp.series('schema', 'watch-schema'));
