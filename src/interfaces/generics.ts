import { JwtPayload } from 'jsonwebtoken';

import { AnyDto } from '../jsonSchemas/interfaces';

export type GenericJwtPayload<T extends Record<string, unknown>> = Omit<JwtPayload, string> & T;

export type DtoWithId<T> = (T extends Exclude<AnyDto, string> ? { _id: string } : {}) & {
  [K in keyof T]: T[K] extends Exclude<AnyDto, string>
    ? DtoWithId<T[K]> | string
    : T[K] extends object
    ? DtoWithId<T[K]>
    : T[K];
};

export type NestedDtoWithId<T> = Omit<DtoWithId<T>, '_id'>;
