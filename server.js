import 'dotenv/config'
import app from './src/app.js';
import config from './src/config/index.js';
import logger from './src/common/logger/index.js';

import os from "os";

const getLocalIP = () => {
  const interfaces = os.networkInterfaces();
  for (const name of Object.keys(interfaces)) {
    for (const net of interfaces[name]) {
      if (net.family === "IPv4" && !net.internal) {
        return net.address;
      }
    }
  }
  return "127.0.0.1";
}

const ip = getLocalIP();

app.listen(config.APP_PORT, () => {
  logger.info(`Server listening on port ${config.APP_PORT} (${config.APP_ENV}) at IP: ${ip}`);
});
