import { Router } from 'express';

import AppointmentsController from '../controllers/AppointmentsController';
import AppointmentNoteController from '../controllers/AppointmentNoteController';

const appointmentRouter = Router();
const appointmentsController = new AppointmentsController();
const appointmentNoteController = new AppointmentNoteController();

appointmentRouter.get('/', appointmentsController.list);

appointmentRouter.get('/:id', appointmentsController.get);

appointmentRouter.post('/', appointmentsController.create);

appointmentRouter.put('/', appointmentsController.update);

appointmentRouter.delete('/:id', appointmentsController.delete);

appointmentRouter.patch('/', appointmentNoteController.update);

export default appointmentRouter;
