# serverless-nestjs

This is an example of creating a function that runs as nestjs using the serverless framework.

Sample publish. https://mmjdx4zxmc.execute-api.ap-northeast-1.amazonaws.com/dev/

## How to copy your project

### 1. Install Serverless Environment

```bash
$ npm install aws-lambda aws-serverless-express express
```

### 2. copy `src/index.ts` and `serverless.yml`
This is minimum setting. if necessary, you add the setting.

## How to Deploy
```bash
$ npm run prestart:prod
$ sls deploy
```