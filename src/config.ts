import dotenv from 'dotenv';
import { expand } from 'dotenv-expand';
import Joi from 'joi';
import path from 'path';

const env = dotenv.config({ path: path.join(__dirname, '../.env') });
expand(env);

const envVarsSchema = Joi.object<{
  NODE_ENV: 'development' | 'production' | 'test';
  HOST: string;
  PORT: number;
  MONGO_DB_HOST: string;
  MONGO_USERNAME: string;
  MONGO_PASSWORD: string;
  ADMIN_USERNAME: string;
  ADMIN_PASSWORD: string;
  MONGO_DB_NAME: string;
  JWT_SECRET: string;
  JWT_EXPIRATION: string;
}>()
  .keys({
    NODE_ENV: Joi.string().valid('production', 'development', 'test').required(),
    PORT: Joi.number().required().description('App port'),
    MONGO_DB_HOST: Joi.string().required().description('Mongo DB host'),
    MONGO_DB_NAME: Joi.string().required().description('Mongo DB name'),
    MONGO_USERNAME: Joi.string().required().description('Mongo DB username'),
    MONGO_PASSWORD: Joi.string().required().description('Mongo DB password'),
    ADMIN_USERNAME: Joi.string().required().description('Admin username'),
    ADMIN_PASSWORD: Joi.string().required().description('Admin password'),
    HOST: Joi.string().allow('', null).empty(['', null]).default('localhost').description('App host'),
    JWT_SECRET: Joi.string().required().description('JWT auth secret key'),
    JWT_EXPIRATION: Joi.string().allow('', null).empty(['', null]).default('1h').description('JWT expiration time'),
  })
  .unknown();

const { value: envVars, error } = envVarsSchema.prefs({ errors: { label: 'key' } }).validate({
  ...process.env,
  PORT: parseInt(process.env.PORT, 10),
});

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

const { MONGO_DB_NAME, NODE_ENV, MONGO_DB_HOST } = envVars;

export const { PORT, HOST, JWT_SECRET, JWT_EXPIRATION, ADMIN_USERNAME, ADMIN_PASSWORD } = envVars;
export { NODE_ENV };

export const MONGO_URI = `${MONGO_DB_HOST}/${MONGO_DB_NAME}-${NODE_ENV}`;
export const APP_URI = `http://${HOST}:${PORT}`;
