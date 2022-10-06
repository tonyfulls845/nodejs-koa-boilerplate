import fs from 'fs';
import * as gulp from 'gulp';
import { compile } from 'json-schema-to-typescript';

const endName = 'schema.ts';
const schemaRoutes = `./src/modules/**/schemas/*${endName}`;
const schemasPath = './src/modules/schemas';

gulp.task('schema', (done) => {
  Object.keys(require.cache)
    .filter((path) => /src\\modules\\(.+\\)?schemas/i.test(path))
    .forEach((path) => {
      console.log(`Clear require cache ${path}`);
      delete require.cache[path];
    });

  import(schemasPath).then(({ schemas }) => {
    compile(
      {
        allOf: Object.keys(schemas).map((model) => ({ $ref: `#/components/schemas/${model}` })),
        components: { schemas },
      },
      `ALL`,
    )
      .then((ts) => {
        const cleanedTs = ts.replace(/(^|\r|\n|\r\n)export\stype\sALL.+(^|\r|\n|\r\n)/gi, '');
        fs.writeFileSync('src/modules/schemas.interfaces.ts', cleanedTs);
        console.log('Write interfaces to file');
      })
      .then(() => done());
  });
});

// Watch Task
gulp.task('watch-schema', function () {
  gulp.watch(schemaRoutes, gulp.series('schema'));
});

// Default Task
gulp.task('default', gulp.series('schema', 'watch-schema'));
