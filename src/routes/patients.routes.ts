import { Router } from 'express';

const patientRouter = Router();

patientRouter.get('/', async (request, response) => {
  response.json({ message: 'Patients' });
});

export default patientRouter;
