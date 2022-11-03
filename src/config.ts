import dotenv from 'dotenv';
import Joi from 'joi';
import path from 'path';

dotenv.config({ path: path.join(__dirname, '../.env') });

const envVarsSchema = Joi.object<{
  NODE_ENV: string;
  PORT: number;
  MONGO_USERNAME: string;
  MONGO_PASSWORD: string;
  MONGO_DB_NAME: string;
  HOST: string;
  JWT_SECRET: string;
  JWT_EXPIRATION: string;
}>()
  .keys({
    NODE_ENV: Joi.string().valid('production', 'development', 'test').required(),
    PORT: Joi.number().required().description('App port'),
    MONGO_DB_NAME: Joi.string().required().description('Mongo DB name'),
    MONGO_USERNAME: Joi.string().required().description('Mongo DB username'),
    MONGO_PASSWORD: Joi.string().required().description('Mongo DB password'),
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

const { MONGO_DB_NAME, NODE_ENV } = envVars;

export const { PORT, HOST, JWT_SECRET, JWT_EXPIRATION } = envVars;

export const MONGO_URI = `mongodb://localhost/${MONGO_DB_NAME}-${NODE_ENV}`;
