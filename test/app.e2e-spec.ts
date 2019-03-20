import * as r from 'request';
import { spawn, ChildProcess } from 'child_process';

describe('Serverless Offline (e2e)', () => {
  let server: ChildProcess;
  let testUrl: String;
  beforeAll((done) => {
    server = spawn('./node_modules/.bin/serverless', ['offline']);
    server.stdout.on('data', function (data) {
      const match = data.toString().match(/Offline listening on (.*)/);
      if (match) {
        testUrl = match[1];
        done();
      }
    });

    server.stderr.on('data', function (data) {
      console.error('stderr:' + data);
    });
  });

  afterAll(() => {
    server.kill('SIGINT')
  });

  it('should return status code 200', (done) => {
    r(testUrl, (err, response, body) => {
      expect(err).toEqual(null);
      expect(response.statusCode).toEqual(200);
      done();
    });
  });
});
