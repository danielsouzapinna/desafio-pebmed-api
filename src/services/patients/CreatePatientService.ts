import { Repository } from 'typeorm';

import Patient from '../../models/Patient';
import logger from '../../winston-custom-log';
import AppError from '../../errors/AppErrors';

interface Request {
  name: string;
  dateBirth: Date;
  gender: string;
  height: number;
  weight: number;
  telephone: string;
}

class CreatePatientService {
  public async execute(patientData: Request, patientRepository: Repository<Patient> | any): Promise<Patient> {
    logger.info(`CreatePatientService => Initializing creating patient: ${JSON.stringify(patientData)}`);

    const patientExist = await patientRepository.findOne({
      where: { telephone: patientData.telephone },
    });

    if (patientExist) {
      logger.warn(`CreateAppointmentService => Patient already exist`);
      throw new AppError('Patient already exist, check the phone.', 409);
    }

    const patient = patientRepository.create({
      name: patientData.name,
      dateBirth: patientData.dateBirth,
      gender: patientData.gender,
      height: patientData.height,
      weight: patientData.weight,
      telephone: patientData.telephone,
      appointments: undefined,
    });

    await patientRepository.save(patient);

    return patient;
  }
}

export default CreatePatientService;
