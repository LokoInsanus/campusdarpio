import express from 'express';
import routes from './routes.js';
import errorHandler from '../src/_middleware/error-handler.js';
import sequelize from '../src/config/database-connection.js';

const app = express();

app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});

app.use(express.json());
app.use(routes);
app.use(errorHandler); // Manipulador de erro global (error handler)

app.listen(3333);