import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import AppointmentsController from '../controllers/AppointmentsController';
import AppointmentNoteController from '../controllers/AppointmentNoteController';

const appointmentRouter = Router();
const appointmentsController = new AppointmentsController();
const appointmentNoteController = new AppointmentNoteController();

appointmentRouter.get('/', appointmentsController.list);

appointmentRouter.get(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),
  appointmentsController.get,
);

appointmentRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      patientId: Joi.string().uuid().required(),
      appointmentDate: Joi.date().required(),
    },
  }),
  appointmentsController.create,
);

appointmentRouter.put(
  '/',
  celebrate({
    [Segments.BODY]: {
      id: Joi.string().uuid().required(),
      date: Joi.date().required(),
      note: Joi.string().required(),
      patient: Joi.object()
        .keys({
          id: Joi.string().uuid().required(),
        })
        .required(),
    },
  }),
  appointmentsController.update,
);

appointmentRouter.delete(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),
  appointmentsController.delete,
);

appointmentRouter.patch(
  '/',
  celebrate({
    [Segments.BODY]: {
      id: Joi.string().uuid().required(),
      note: Joi.string().required(),
    },
  }),
  appointmentNoteController.update,
);

export default appointmentRouter;
