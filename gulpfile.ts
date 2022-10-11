import fs from 'fs';
import * as gulp from 'gulp';
import { compile } from 'json-schema-to-typescript';

const modulesJoiSchemasRoutes = `./src/modules/**/joiSchemas/*joiSchema.ts`;
const modelsJsonSchemasRoutes = `./src/jsonSchemas/models/*jsonSchema.ts`;
const joiValidatorsRoutes = `./src/joiValidators/*.joiValidator.ts`;
const jsonSchemasPath = './src/jsonSchemas';


const generateInterfaces = (src: string, dst: string, variable: string, interfaceName: string, done: any) => {

  import(file).then(({ [variable]: jsonSchemas }) => {
    const schema = {
      anyOf: Object.keys(jsonSchemas).map((model) => ({ $ref: `#/components/schemas/${model}` })),
      components: { schemas: jsonSchemas },
    };

    compile(schema, interfaceName)
      .then((ts) => {
        fs.writeFileSync(dst, ts);
        console.log('Write interfaces to file');
      })
      .then(() => done());
  });
}

gulp.task('schema', (done) => {
  Object.keys(require.cache)
    .filter((path) => {
      return /src[\\/]modules[\\/].+[\\/]joiSchemas/i.test(path) || /src[\\/]jsonSchemas/i.test(path);
    })
    .forEach((path) => {
      console.log(`Clear require cache ${path}`);
      delete require.cache[path];
    });

  generateInterfaces(jsonSchemasPath, )

});

// Watch Task
gulp.task('watch-schema', function () {
  gulp.watch([modulesJoiSchemasRoutes, modelsJsonSchemasRoutes, joiValidatorsRoutes], gulp.series('schema'));
});

// Default Task
gulp.task('default', gulp.series('schema', 'watch-schema'));
