import 'dotenv/config'
import app from './src/app.js';
import config from './src/config/index.js';
import logger from './src/common/logger/index.js';

app.listen(config.APP_PORT, () => {
  logger.info(`Server listening on port ${config.APP_PORT} (${config.APP_ENV})`);
});
