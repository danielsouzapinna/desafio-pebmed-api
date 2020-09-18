import { Router } from 'express';

const appointmentRouter = Router();

appointmentRouter.get('/', async (request, response) => {
  response.json({ message: 'Appointments' });
});

export default appointmentRouter;
