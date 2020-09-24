import { Request, Response } from 'express';
import { getRepository } from 'typeorm';

import Patient from '../models/Patient';
import CreatePatientService from '../services/CreatePatientService';

export default class PatientsController {
  public async create(request: Request, response: Response): Promise<Response> {
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
  }

  public async list(request: Request, response: Response): Promise<Response> {
    try {
      const patientsRepository = getRepository(Patient);
      const patients = await patientsRepository.find({ relations: ['appointments'] });

      return response.json(patients);
    } catch (error) {
      return response.status(400).json({ message: error.message });
    }
  }

  public async get(request: Request, response: Response): Promise<Response> {
    try {
      const { id } = request.params;

      const patientsRepository = getRepository(Patient);
      const patient = await patientsRepository.findOne(id, { relations: ['appointments'] });

      return response.json(patient);
    } catch (error) {
      return response.status(400).json({ message: error.message });
    }
  }

  public async update(request: Request, response: Response): Promise<Response> {
    try {
      const { id, name, gender, height, weight, telephone } = request.body;

      const patientsRepository = getRepository(Patient);
      const result = await patientsRepository.update(id, { name, gender, height, weight, telephone });

      return response.status(204).json(result);
    } catch (error) {
      return response.status(400).json({ message: error.message });
    }
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    try {
      const { id } = request.params;

      const patientsRepository = getRepository(Patient);
      await patientsRepository.delete(id);

      return response.status(204).send();
    } catch (error) {
      return response.status(400).json({ message: error.message });
    }
  }
}
