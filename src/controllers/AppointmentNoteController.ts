import { Request, Response } from 'express';

import logger from '../winston-custom-log';
import UpdateAppointmentNoteService from '../services/appointments/UpdateAppointmentNoteService';

export default class AppointmentNoteController {
  public async update(request: Request, response: Response): Promise<Response> {
    logger.info(`AppointmentNoteController::update => Initializing appointment note update`);
    try {
      const { id, note } = request.body;

      const updateAppointmentNote = new UpdateAppointmentNoteService();
      const appointment = await updateAppointmentNote.execute({
        id,
        note,
      });

      return response.status(200).json(appointment);
    } catch (error) {
      logger.error(`AppointmentNoteController::update => Error on update: ${error}`);
      return response.status(error.statusCode).json({ message: error.message });
    }
  }
}
