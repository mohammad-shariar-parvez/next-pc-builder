import mongoose from 'mongoose';
import app from './app';
import config from './config';
// import { logger, errorLogger } from './shared/logger';
import { Server } from 'http';

process.on('uncaughtException', error => {
  // console.log('Uncaught is detected,WE are closing server')
  console.log(error);
  process.exit(1);
});

let server: Server;
async function bootstrap() {
  try {
    await mongoose.connect(config.dataBase_url as string);
    console.log(`Database connected Successfully`);

    server = app.listen(config.port, () => {
      console.log(`Example app listening on port ${config.port}`);
    });
  } catch (error) {
    console.log('Failed to connect db', error);
  }

  process.on('unhandledRejection', error => {
    // console.log('Unhandled rejection is detected,WE are closing server')

    if (server) {
      server.close(() => {
        console.log(error);
        process.exit(1);
      });
    } else {
      process.exit(1);
    }
  });
}
bootstrap();

process.on('SIGTERM', () => {
  console.log('SIGTERM is received');
  if (server) {
    server.close();
  }
});
