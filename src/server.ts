import express from 'express';
import swaggerUi from 'swagger-ui-express';

import routes from './routes';
import './database';
import * as swaggerDocument from './swagger.json';

const app = express();

app.use(express.json());
app.use(routes);
app.use('/', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.listen(8000, () => {
  console.log('Server started on port 8000!');
});
