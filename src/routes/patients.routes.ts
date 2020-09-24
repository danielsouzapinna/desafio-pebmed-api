import { Router } from 'express';

import PatientsController from '../controllers/PatientsController';

const patientRouter = Router();
const patientsController = new PatientsController();

patientRouter.get('/', patientsController.list);

patientRouter.get('/:id', patientsController.get);

patientRouter.post('/', patientsController.create);

patientRouter.put('/', patientsController.update);

patientRouter.delete('/:id', patientsController.delete);

export default patientRouter;
