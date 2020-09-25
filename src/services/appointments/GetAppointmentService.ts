import { Repository } from 'typeorm';

import Appointment from '../../models/Appointment';
import AppError from '../../errors/AppErrors';
import logger from '../../winston-custom-log';

interface Request {
  id: string;
}

class GetAppointmentService {
  public async execute({ id }: Request, appointmentRepository: Repository<Appointment> | any): Promise<Appointment> {
    logger.info(`GetAppointmentService => Initializing geting appointment for appointment id: ${id}`);
    const appointment = await appointmentRepository.findOne(id);

    if (!appointment) {
      logger.warn(`GetAppointmentService => Appointment not found`);
      throw new AppError('Appointment not found.', 404);
    }

    return appointment;
  }
}

export default GetAppointmentService;
