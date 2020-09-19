import { Router } from 'express';
import { getRepository } from 'typeorm';

import CreatePatientService from '../services/CreatePatientService';
import Patient from '../models/Patient';

const patientRouter = Router();

patientRouter.get('/', async (request, response) => {
  const patientsRepository = getRepository(Patient);
  const patients = await patientsRepository.find();

  response.json(patients);
});

patientRouter.post('/', async (request, response) => {
  try {
    const { name, dateBirth, gender, height, weight, telephone } = request.body;

    const createPatient = new CreatePatientService();

    const patient = await createPatient.execute({
      name,
      dateBirth,
      gender,
      height,
      weight,
      telephone,
    });

    return response.json(patient);
  } catch (error) {
    return response.status(400).json({ message: error.message });
  }
});

export default patientRouter;
