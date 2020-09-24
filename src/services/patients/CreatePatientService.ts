import { getRepository } from 'typeorm';

import Patient from '../../models/Patient';
import logger from '../../winston-custom-log';

interface Request {
  name: string;
  dateBirth: Date;
  gender: string;
  height: number;
  weight: number;
  telephone: string;
}

class CreatePatientService {
  public async execute(patientData: Request): Promise<Patient> {
    logger.info(`CreatePatientService => Initializing creating patient: ${JSON.stringify(patientData)}`);
    const patientRepository = getRepository(Patient);

    // Some business rule to prevent duplicate records would be a good idea

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
