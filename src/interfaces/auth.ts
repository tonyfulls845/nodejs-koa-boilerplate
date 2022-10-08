import { GenericJwtPayload } from './generics';

export type AppJWTPayload = GenericJwtPayload<{
  data: { _id: string };
}>;
