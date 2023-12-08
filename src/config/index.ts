import 'reflect-metadata';

import path from 'node:path';
import process from 'node:process';

import { plainToClass } from 'class-transformer';
import { IsEnum, IsNumber, IsString, validateSync } from 'class-validator';
import * as dotenv from 'dotenv';

import constants from './constants';
import originLocales from "./locales";
import { Environment } from './types';

/** Updated to default value on check */
let { NODE_ENV: nodeENV } = process.env;

if (!Object.values(Environment).find(env => env === nodeENV)) {
  console.warn(`WARN: Default NODE_ENV is using - ${constants.DEFAULT_NODE_ENV}`);
  nodeENV = constants.DEFAULT_NODE_ENV;
}
dotenv.config({ path: path.resolve(process.cwd(), `.env.${nodeENV}`) });

class EnvironmentVariables {
  /** Environment */
  @IsEnum(Environment)
  NODE_ENV: Environment;

  /** Server */
  @IsNumber()
  PORT: number;

  @IsString()
  HOST: string;

  /** Bots */
  @IsString()
  TELEGRAM_TOKEN: string;

  /** Backend */
  @IsString()
  BACKEND_DOMAIN: string;
}

export const validation = (): EnvironmentVariables => {
  const envConfig = {
    /** Environment */
    NODE_ENV: nodeENV,

    /** Server */
    PORT: parseInt(process.env.PORT ?? '', 10) || constants.DEFAULT_PORT,
    HOST: process.env.HOST ?? constants.DEFAULT_HOST,

    /** Bots */
    TELEGRAM_TOKEN: process.env.TELEGRAM_TOKEN,

    /** Backend */
    BACKEND_DOMAIN: process.env.BACKEND_DOMAIN,
  };
  try {
    const validatedConfig = plainToClass(EnvironmentVariables, envConfig, {
      enableImplicitConversion: true,
    });
    const errors = validateSync(validatedConfig, {
      skipMissingProperties: false,
    });

    if (errors.length > 0) {
      throw new Error(errors.toString());
    }
    return validatedConfig;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

export * from './types';
export const locales = originLocales;
export const config = {
  constants,
  env: validation(),
  locales: originLocales,
};

export default config;
