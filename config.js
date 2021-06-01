import dotenv from 'dotenv';

dotenv.config();

export default {
  port: process.env.PORT || 3000,
  databaseURL: process.env.DATABASE_URI,
  secret: process.env.SECRET,
};
