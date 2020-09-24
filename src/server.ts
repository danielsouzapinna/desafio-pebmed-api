import express from 'express';
import swaggerUi from 'swagger-ui-express';
import { errors } from 'celebrate';
import routes from './routes';
import './database';
import * as swaggerDocument from './swagger.json';
import logger from './winston-custom-log';

const app = express();
app.use(express.json());
app.use(routes);
app.use(errors());

app.use('/', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.listen(8000, () => {
  logger.info('Server started on port 8000!');
});
