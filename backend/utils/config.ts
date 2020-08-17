import fs from 'fs';
import winston from 'winston';
import yaml from 'yaml';
import { getLogger } from './logger';

let config = null;

export function loadConfig(): any {
  if (config) {
    return config;
  }

  const logger = getLogger();

  try {
    const environment = process.env.NODE_ENV || 'development';

    logger.info(`Environment: ${environment}`);

    const file = fs.readFileSync(`config/${environment}.yml`, 'utf8');

    config = yaml.parse(file);

    return config;
  } catch (err) {
    console.error(err);
    throw err;
  }
}
