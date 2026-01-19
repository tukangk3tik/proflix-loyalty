import Joi from 'joi';

export const ENV_VALIDATION_SCHEMA = Joi.object({
  DATASOURCE_USERNAME: Joi.string().required(),
  DATASOURCE_PASSWORD: Joi.string().required(),
  DATASOURCE_HOST: Joi.string().required(),
  DATASOURCE_PORT: Joi.number().required(),
  DATASOURCE_DATABASE: Joi.string().required(),
  JWT_SECRET: Joi.string().required(),
  JWT_TTL: Joi.string().required(),
});
