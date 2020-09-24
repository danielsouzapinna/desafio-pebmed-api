import { getRepository } from 'typeorm';

import Patient from '../../models/Patient';
import AppError from '../../errors/AppErrors';
import logger from '../../winston-custom-log';

interface Request {
  id: string;
  name: string;
  dateBirth: Date;
  gender: string;
  height: number;
  weight: number;
  telephone: string;
}

class UpdatePatientService {
  public async execute(patientData: Request): Promise<Patient | undefined> {
    logger.info(`UpdatePatientService => Initializing updating patient: ${JSON.stringify(patientData)}`);
    const patientRepository = getRepository(Patient);

    const patient = await patientRepository.findOne(patientData.id);

    if (!patient) {
      logger.warn(`UpdatePatientService => Patient not found`);
      throw new AppError('Patient not found.', 404);
    }

    await patientRepository.update(patientData.id, {
      name: patientData.name,
      dateBirth: patientData.dateBirth,
      gender: patientData.gender,
      height: patientData.height,
      weight: patientData.weight,
      telephone: patientData.telephone,
    });

    const patientUpdated = await patientRepository.findOne(patientData.id);

    return patientUpdated;
  }
}

export default UpdatePatientService;
