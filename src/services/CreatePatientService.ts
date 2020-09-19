import { getRepository } from 'typeorm';

import Patient from '../models/Patient';
import Appointment from '../models/Appointment';

interface Request {
  name: string;
  dateBirth: Date;
  gender: string;
  height: number;
  weight: number;
  telephone: string;
}

class CreatePatientService {
  public async execute({ name, dateBirth, gender, height, weight, telephone }: Request): Promise<Patient> {
    const patientRepository = getRepository(Patient);

    const user = patientRepository.create({
      name,
      dateBirth,
      gender,
      height,
      weight,
      telephone,
      appointments: undefined,
    });

    await patientRepository.save(user);

    return user;
  }
}

export default CreatePatientService;
