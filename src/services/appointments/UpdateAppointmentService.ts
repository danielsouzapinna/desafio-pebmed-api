import { getRepository } from 'typeorm';

import Patient from '../../models/Patient';
import Appointment from '../../models/Appointment';
import AppError from '../../errors/AppErrors';
import logger from '../../winston-custom-log';

interface IPatient {
  id: string;
}

interface Request {
  id: string;
  date: Date;
  note: string;
  patient: IPatient;
}

class UpdateAppointmentService {
  public async execute(appointmentData: Request): Promise<Appointment | undefined> {
    logger.info(`UpdateAppointmentService => Initializing updating appointment for appointment: ${JSON.stringify(appointmentData)}`);
    const patientRepository = getRepository(Patient);
    const appointmentRepository = getRepository(Appointment);

    const patientFounded = await patientRepository.findOne(appointmentData.patient.id);

    if (!patientFounded) {
      logger.warn(`UpdateAppointmentService => Patient not found`);
      throw new AppError('Patient not found.', 404);
    }

    const appointment = await appointmentRepository.findOne(appointmentData.id);

    if (!appointment) {
      logger.warn(`UpdateAppointmentService => Appointment not found`);
      throw new AppError('Appointment not found.', 404);
    }

    await appointmentRepository.update(appointmentData.id, {
      date: appointmentData.date,
      note: appointmentData.note,
      patient: appointmentData.patient,
    });

    const appointmentUpdated = await appointmentRepository.findOne(appointmentData.id);

    return appointmentUpdated;
  }
}

export default UpdateAppointmentService;
