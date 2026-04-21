export default {
  APP_ENV: process.env.NODE_ENV,
  APP_VERSION: process.env.VERSION,
  APP_PORT: process.env.PORT,
  LOG_LEVEL: process.env.LOG_LEVEL,
  APP_API_KEY: process.env.API_KEY,
  JWT_SECRET: process.env.JWT_SECRET,
  DB_URL: `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}/${process.env.DB_NAME}`,
};
