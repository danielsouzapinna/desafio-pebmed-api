import { Router } from 'express';

import appointmentsRouter from './appoitments.routes';
import patientsRouter from './patients.routes';

const routes = Router();

routes.use('/appointments', appointmentsRouter);
routes.use('/patients', patientsRouter);

export default routes;
