import { Request, Response } from 'express';
import { getRepository } from 'typeorm';

import logger from '../winston-custom-log';
import Appointment from '../models/Appointment';
import CreateAppointmentService from '../services/appointments/CreateAppointmentService';
import UpdateAppointmentService from '../services/appointments/UpdateAppointmentService';
import DeleteAppointmentService from '../services/appointments/DeleteAppointmentService';
import GetAppointmentService from '../services/appointments/GetAppointmentService';

export default class AppointmentsController {
  public async create(request: Request, response: Response): Promise<Response> {
    logger.info(`AppointmentsController::create => Initializing appointment create`);
    try {
      const { patientId, appointmentDate } = request.body;

      const createAppointment = new CreateAppointmentService();

      const appointment = await createAppointment.execute({
        appointmentDate,
        patientId,
      });

      return response.status(201).json(appointment.id);
    } catch (error) {
      logger.error(`AppointmentNoteController::create => Error on create: ${error}`);
      return response.status(error.statusCode).json({ message: error.message });
    }
  }

  public async list(request: Request, response: Response): Promise<Response> {
    logger.info(`AppointmentsController::list => Initializing appointment list`);
    try {
      const appointmentRepository = getRepository(Appointment);
      const appointments = await appointmentRepository.find({ relations: ['patient'] });

      return response.json(appointments);
    } catch (error) {
      logger.error(`AppointmentNoteController::list => Error on list: ${error}`);
      return response.status(error.statusCode).json({ message: error.message });
    }
  }

  public async get(request: Request, response: Response): Promise<Response> {
    logger.info(`AppointmentsController::get => Initializing appointment get`);
    try {
      const { id } = request.params;

      const getAppointment = new GetAppointmentService();

      const appointment = await getAppointment.execute({ id });

      return response.json(appointment);
    } catch (error) {
      logger.error(`AppointmentNoteController::get => Error on get: ${error}`);
      return response.status(error.statusCode).json({ message: error.message });
    }
  }

  public async update(request: Request, response: Response): Promise<Response> {
    logger.info(`AppointmentsController::update => Initializing appointment update`);
    try {
      const { id, date, note, patient } = request.body;

      const updateAppointment = new UpdateAppointmentService();

      const appointment = await updateAppointment.execute({
        id,
        date,
        note,
        patient,
      });

      return response.status(200).json(appointment);
    } catch (error) {
      logger.error(`AppointmentNoteController::update => Error on update: ${error}`);
      return response.status(error.statusCode).json({ message: error.message });
    }
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    logger.info(`AppointmentsController::delete => Initializing appointment delete`);
    try {
      const { id } = request.params;

      const deleteAppointment = new DeleteAppointmentService();

      await deleteAppointment.execute({ id });

      return response.status(204).send();
    } catch (error) {
      logger.error(`AppointmentNoteController::delete => Error on delete: ${error}`);
      return response.status(error.statusCode).json({ message: error.message });
    }
  }
}
