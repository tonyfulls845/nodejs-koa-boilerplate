import { Document as MongooseDocument } from 'mongoose';

import { ModelWithId, NestedModelWithId } from '../interfaces/generics';
import { AnyModel } from '../jsonSchemas/interfaces';

export type Document<Dto extends AnyModel> = NestedModelWithId<Dto> &
  MongooseDocument<any, any, NestedModelWithId<Dto>>;

export const getRefId = <Dto extends AnyModel>(doc: ModelWithId<Dto> | string) =>
  typeof doc === 'string' ? doc : doc._id;
