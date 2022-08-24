import 'reflect-metadata';
import 'express-async-errors';
import { appConfig } from './config/app.config';

import app from './app';
import { appWorkLogger } from './utils/logger';

function bootstrap() {
  app.listen(appConfig.port, () => {
    appWorkLogger.info(`App running... Open: ${appConfig.domain}`);
  });
}

bootstrap();
