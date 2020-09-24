import { getRepository } from 'typeorm';

import Appointment from '../../models/Appointment';
import AppError from '../../errors/AppErrors';
import logger from '../../winston-custom-log';

interface Request {
  id: string;
}

class DeleteAppointmentService {
  public async execute({ id }: Request): Promise<void> {
    logger.info(`DeleteAppointmentService => Initializing deleting appointment for id: ${id}`);
    const appointmentRepository = getRepository(Appointment);

    const appointment = await appointmentRepository.findOne(id);

    if (!appointment) {
      logger.warn(`DeleteAppointmentService => Appointment not found`);
      throw new AppError('Appointment not found.', 404);
    }

    await appointmentRepository.delete(id);
  }
}

export default DeleteAppointmentService;
