import { JwtPayload } from 'jsonwebtoken';

import { AnyModel } from '../jsonSchemas/interfaces';

export type GenericJwtPayload<T extends Record<string, unknown>> = Omit<JwtPayload, string> & T;

export type ModelWithId<T> = (T extends AnyModel ? { _id: string } : {}) & {
  [K in keyof T]: T[K] extends AnyModel
    ? ModelWithId<T[K]> | string
    : T[K] extends AnyModel[]
    ? ModelWithId<T[K][number]>[] | string[]
    : T[K] extends object
    ? ModelWithId<T[K]>
    : T[K];
};

export type NestedModelWithId<T> = Omit<ModelWithId<T>, '_id'>;
