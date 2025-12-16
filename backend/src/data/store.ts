import { createClient, RedisClientType } from 'redis';
import { config } from '../config/index.js';

export const redisClient: RedisClientType = createClient({
  url: config.redisUrl
});

redisClient.on('error', (err) => {
  console.error('Redis Client Error', err);
});

redisClient.on('connect', () => {
  console.log('Redis Client Connected');
});

export const connectRedis = async (): Promise<void> => {
  await redisClient.connect();
};

export const disconnectRedis = async (): Promise<void> => {
  await redisClient.disconnect();
};