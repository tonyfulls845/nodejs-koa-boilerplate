import fs from 'fs';
import * as gulp from 'gulp';
import { compile } from 'json-schema-to-typescript';

const modulesJoiSchemasRoutes = `./src/modules/**/joiSchemas/*joiSchema.ts`;
const modelsJsonSchemasRoutes = `./src/jsonSchemas/models/*jsonSchema.ts`;
const jsonSchemasPath = './src/jsonSchemas';

gulp.task('schema', (done) => {
  Object.keys(require.cache)
    .filter((path) => {
      return /src[\\/]modules[\\/].+[\\/]joiSchemas/i.test(path) || /src[\\/]jsonSchemas/i.test(path);
    })
    .forEach((path) => {
      console.log(`Clear require cache ${path}`);
      delete require.cache[path];
    });

  import(jsonSchemasPath).then(({ jsonSchemas }) => {
    const schema = {
      allOf: Object.keys(jsonSchemas).map((model) => ({ $ref: `#/components/schemas/${model}` })),
      components: { schemas: jsonSchemas },
    };

    compile(schema, `ALL`)
      .then((ts) => {
        const cleanedTs = ts.replace(/(^|\r|\n|\r\n)export\stype\sALL[^;]+;(\r|\n|\r\n|$)/gi, '');
        fs.writeFileSync(`${jsonSchemasPath}/interfaces.ts`, cleanedTs);
        console.log('Write interfaces to file');
      })
      .then(() => done());
  });
});

// Watch Task
gulp.task('watch-schema', function () {
  gulp.watch([modulesJoiSchemasRoutes, modelsJsonSchemasRoutes], gulp.series('schema'));
});

// Default Task
gulp.task('default', gulp.series('schema', 'watch-schema'));
