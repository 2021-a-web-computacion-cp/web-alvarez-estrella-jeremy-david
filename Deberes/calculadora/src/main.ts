import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
const cookieParser = require('cookie-parser'); // Importar cosas en JS
const express = require('express');
const session = require('express-session');
const FileStore = require('session-file-store')(session);

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(express.static('publico')); // Servidor Web Estatico
  app.use(cookieParser('Me agradan los poliperros')); // Secreto Cookies
  app.use(// Session
    session({
      name: 'server-session-id',
      secret: 'No sera de tomar un traguito',
      resave: true,
      saveUninitialized: true,
      cookie: { secure: false },
      store: new FileStore(),
    }),
  );

  await app.listen(3000);
}
bootstrap();
