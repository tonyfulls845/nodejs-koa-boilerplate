import fs from 'fs';
import { src, task } from 'gulp';
import { AnySchema } from 'joi';
import j2s from 'joi-to-swagger';
import { compile } from 'json-schema-to-typescript';
import through from 'through2';

function path(str: string): string {
  let base = str;
  if (base.lastIndexOf(endName) != -1) base = base.substring(0, base.lastIndexOf(endName));
  return base;
}

let schemaIndex = 0;
const endName = 'schema.ts';
const schemaRoutes = `./src/modules/**/schema/*${endName}`;

task('schema', () => {
  return src(schemaRoutes).pipe(
    through.obj((chunk, enc, cb) => {
      const filename = chunk.path;
      import(filename).then((file) => {
        //Handle all exports
        Object.entries(file)
          .filter(([name]) => /^.+Schema$/.test(name))
          .forEach(([, schema]) => {
            const { swagger, components } = j2s(schema as AnySchema);

            console.log('Converting', filename);
            compile({ allOf: [swagger], components }, `ALL_OF_${schemaIndex++}`).then((ts) => {
              const cleanedTs = ts.replace(/(^|\r|\n|\r\n)export\stype\sALL_OF.+(^|\r|\n|\r\n)/gi, '');
              fs.writeFileSync(path(filename).concat('joi.ts'), cleanedTs);
            });
          });
      });
      cb(null, chunk);
    }),
  );
});
