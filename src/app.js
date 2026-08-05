const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../docs/swagger.json');
const apiRoutes = require('./routes/apiRoutes');

const app = express();

app.use(express.json());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use(apiRoutes);

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  res.status(statusCode).json({ message: err.message || 'Erro interno do servidor' });
});

module.exports = app;
