import { Repository } from 'typeorm';

import Appointment from '../../models/Appointment';
import AppError from '../../errors/AppErrors';
import logger from '../../winston-custom-log';

interface Request {
  id: string;
  note: string;
}

class UpdateAppointmentNoteService {
  public async execute({ id, note }: Request, appointmentRepository: Repository<Appointment> | any): Promise<Appointment> {
    logger.info(`UpdateAppointmentNoteService => Initializing updating appointment note for id: ${id}`);

    const appointment = await appointmentRepository.findOne(id);

    if (!appointment) {
      logger.warn(`UpdateAppointmentNoteService => Appointment not found`);
      throw new AppError('Appointment not found.', 404);
    }

    appointment.note = note;
    await appointmentRepository.save(appointment);

    return appointment;
  }
}

export default UpdateAppointmentNoteService;
