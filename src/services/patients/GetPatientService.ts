import { Repository } from 'typeorm';

import Patient from '../../models/Patient';
import AppError from '../../errors/AppErrors';
import logger from '../../winston-custom-log';

interface Request {
  id: string;
}

class GetPatientService {
  public async execute({ id }: Request, patientRepository: Repository<Patient> | any): Promise<Patient> {
    logger.info(`GetPatientService => Initializing get patient for id: ${id}`);

    const patient = await patientRepository.findOne(id, { relations: ['appointments'] });

    if (!patient) {
      logger.warn(`GetPatientService => Patient not found`);
      throw new AppError('Patient not found.', 404);
    }

    return patient;
  }
}

export default GetPatientService;
