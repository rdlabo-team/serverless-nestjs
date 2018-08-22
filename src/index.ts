import { Context, Handler } from 'aws-lambda';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Server } from 'http';
import * as serverless from 'aws-serverless-express';

const express = require('express')();
let cachedServer: Server;

function bootstrapServer(): Promise<Server> {
  return NestFactory.create(AppModule, express)
    .then(app => app.enableCors())
    .then(app => app.init())
    .then(() => serverless.createServer(express));
}

export const handler: Handler = (event: any, context: Context) => {
  if (!cachedServer) {
    bootstrapServer().then(server => {
      cachedServer = server;
      return serverless.proxy(server, event, context);
    });
  } else {
    return serverless.proxy(cachedServer, event, context);
  }
};
