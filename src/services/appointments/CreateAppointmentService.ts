import { getRepository } from 'typeorm';

import Patient from '../../models/Patient';
import Appointment from '../../models/Appointment';
import AppError from '../../errors/AppErrors';
import logger from '../../winston-custom-log';

interface Request {
  patientId: string;
  appointmentDate: Date;
}

class CreateAppointmentService {
  public async execute({ patientId, appointmentDate }: Request): Promise<Appointment> {
    logger.info(`CreateAppointmentService => Initializing creating appointment for patientId: ${patientId} on date: ${appointmentDate}`);
    const patientRepository = getRepository(Patient);
    const appointmentRepository = getRepository(Appointment);

    const patient = await patientRepository.findOne(patientId);

    if (!patient) {
      logger.warn(`CreateAppointmentService => Patient not found`);
      throw new AppError('Patient not found.', 404);
    }

    const appointment = appointmentRepository.create({
      date: appointmentDate,
      patient,
    });

    await appointmentRepository.save(appointment);

    return appointment;
  }
}

export default CreateAppointmentService;
