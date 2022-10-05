import fs from 'fs';
import * as gulp from 'gulp';
import { compile } from 'json-schema-to-typescript';

const endName = 'schema.ts';
const schemaRoutes = `./src/modules/**/schemas/*${endName}`;

gulp.task('schemas', () => {
  import('./src/modules/schemas').then(({ schemas }) => {
    compile(
      {
        allOf: Object.keys(schemas).map((model) => ({ $ref: `#/components/schemas/${model}` })),
        components: { schemas },
      },
      `ALL`,
    ).then((ts) => {
      const cleanedTs = ts.replace(/(^|\r|\n|\r\n)export\stype\sALL.+(^|\r|\n|\r\n)/gi, '');
      fs.writeFileSync('src/modules/schemas.interfaces.ts', cleanedTs);
    });
  });
});

// Watch Task
gulp.task('watch', function () {
  gulp.watch(schemaRoutes, gulp.series('schemas'));
});

// Default Task
gulp.task('default', gulp.parallel('watch'));
