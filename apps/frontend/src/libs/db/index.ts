import mongo from './mongodb';
import postgres from './postgres';
import redis from './redis';

export default {
  ...mongo,
  ...postgres,
  ...redis,
};
