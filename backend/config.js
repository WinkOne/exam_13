const path = require('path');

const rootPath = __dirname;

const env = process.env.NODE_ENV;

if (env === 'test') {
  database = 'mongodb://localhost/lab228-test';
  port = 8010;
}

module.exports = {
  rootPath,
  uploadPath: path.join(rootPath, 'public'),
  database: 'mongodb://localhost/lab228',
  databaseOptions: {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  }
};