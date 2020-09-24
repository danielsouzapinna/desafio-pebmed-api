import { Request, Response } from 'express';
import { getRepository } from 'typeorm';

import Patient from '../models/Patient';
import logger from '../winston-custom-log';
import CreatePatientService from '../services/patients/CreatePatientService';
import UpdatePatientService from '../services/patients/UpdatePatientService';
import DeletePatientService from '../services/patients/DeletePatientService';
import GetPatientService from '../services/patients/GetPatientService';

export default class PatientsController {
  public async create(request: Request, response: Response): Promise<Response> {
    logger.info(`PatientsController::create => Initializing patient create`);
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

      return response.status(201).json(patient.id);
    } catch (error) {
      logger.error(`PatientsController::create => Error on create: ${error}`);
      return response.status(error.statusCode).json({ message: error.message });
    }
  }

  public async list(request: Request, response: Response): Promise<Response> {
    logger.info(`PatientsController::list => Initializing patient list`);
    try {
      const patientsRepository = await getRepository(Patient);
      const patients = await patientsRepository.find({ relations: ['appointments'] });

      return response.status(200).json(patients);
    } catch (error) {
      logger.error(`PatientsController::list => Error on create: ${error}`);
      return response.status(error.statusCode).json({ message: error.message });
    }
  }

  public async get(request: Request, response: Response): Promise<Response> {
    logger.info(`PatientsController::get => Initializing patient get`);
    try {
      const { id } = request.params;

      const getPatient = new GetPatientService();

      const patient = await getPatient.execute({ id });

      return response.status(200).json(patient);
    } catch (error) {
      logger.error(`PatientsController::get => Error on get: ${error}`);
      return response.status(error.statusCode).json({ message: error.message });
    }
  }

  public async update(request: Request, response: Response): Promise<Response> {
    logger.info(`PatientsController::update => Initializing patient update`);
    try {
      const { id, name, dateBirth, gender, height, weight, telephone } = request.body;

      const updatePatient = new UpdatePatientService();

      const patient = await updatePatient.execute({
        id,
        name,
        dateBirth,
        gender,
        height,
        weight,
        telephone,
      });

      return response.status(200).json(patient);
    } catch (error) {
      logger.error(`PatientsController::update => Error on update: ${error}`);
      return response.status(error.statusCode).json({ message: error.message });
    }
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    logger.info(`PatientsController::delete => Initializing patient delete`);
    try {
      const { id } = request.params;

      const deletePatient = new DeletePatientService();

      await deletePatient.execute({ id });

      return response.status(204).send();
    } catch (error) {
      logger.error(`PatientsController::delete => Error on delete: ${error}`);
      return response.status(error.statusCode).json({ message: error.message });
    }
  }
}
