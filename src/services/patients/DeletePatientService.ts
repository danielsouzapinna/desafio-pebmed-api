import { Repository } from 'typeorm';

import Patient from '../../models/Patient';
import AppError from '../../errors/AppErrors';
import logger from '../../winston-custom-log';

interface Request {
  id: string;
}

class DeletePatientService {
  public async execute({ id }: Request, patientRepository: Repository<Patient> | any): Promise<void> {
    logger.info(`DeletePatientService => Initializing deleting patient for id: ${id}`);
    const patient = await patientRepository.findOne(id);

    if (!patient) {
      logger.warn(`DeletePatientService => Patient not found`);
      throw new AppError('Patient not found.', 404);
    }

    await patientRepository.delete(id);
  }
}

export default DeletePatientService;
