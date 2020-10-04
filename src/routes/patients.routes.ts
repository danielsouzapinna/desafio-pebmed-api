import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import PatientsController from '../controllers/PatientsController';

const patientRouter = Router();
const patientsController = new PatientsController();

patientRouter.get('/', patientsController.list);

patientRouter.get(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),
  patientsController.get,
);

patientRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      dateBirth: Joi.date().required(),
      gender: Joi.string().required(),
      height: Joi.string().required(),
      weight: Joi.string().required(),
      telephone: Joi.string()
        .regex(/^\d{2}-\d{5}-\d{4}$/)
        .required(),
    },
  }),
  patientsController.create,
);

patientRouter.put(
  '/',
  celebrate({
    [Segments.BODY]: {
      id: Joi.string().uuid().required(),
      name: Joi.string().required(),
      dateBirth: Joi.date().required(),
      gender: Joi.string().required(),
      height: Joi.string().required(),
      weight: Joi.string().required(),
      telephone: Joi.string()
        .regex(/^\d{2}-\d{5}-\d{4}$/)
        .required(),
    },
  }),
  patientsController.update,
);

patientRouter.delete(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),
  patientsController.delete,
);

export default patientRouter;
