import dotenv from 'dotenv';

dotenv.config();

export interface AppConfig {
  port: number;
  nodeEnv: string;
  frontendUrl: string;
  apiBaseUrl: string;
  redisUrl: string;
}

const requiredEnvVars = [
  'PORT',
  'NODE_ENV',
  'FRONTEND_URL',
  'API_BASE_URL',
  'REDIS_URL'
] as const;

const missingVars = requiredEnvVars.filter(varName => !process.env[varName]);

if (missingVars.length > 0) {
  throw new Error(`Missing required environment variables: ${missingVars.join(', ')}`);
}

export const config: AppConfig = {
  port: parseInt(process.env.PORT!, 10),
  nodeEnv: process.env.NODE_ENV!,
  frontendUrl: process.env.FRONTEND_URL!,
  apiBaseUrl: process.env.API_BASE_URL!,
  redisUrl: process.env.REDIS_URL!
};