import { JwtPayload } from 'jsonwebtoken';

export type GenericJwtPayload<T extends Record<string, unknown>> = Omit<JwtPayload, string> & T;
