import { Request, Response } from 'express';
import { getRepository } from 'typeorm';

import Appointment from '../models/Appointment';
import Patient from '../models/Patient';

export default class AppointmentsController {
  public async create(request: Request, response: Response): Promise<Response> {
    try {
      const { patientId, appointmentDate } = request.body;

      const appointmentRepository = getRepository(Appointment);
      const patientsRepository = getRepository(Patient);

      const patient = await patientsRepository.findOne(patientId);
      const appointment = await appointmentRepository.create({
        date: appointmentDate,
        patient,
      });

      await appointmentRepository.save(appointment);
      return response.json(appointment);
    } catch (error) {
      return response.status(400).json({ message: error.message });
    }
  }

  public async list(request: Request, response: Response): Promise<Response> {
    try {
      const appointmentRepository = getRepository(Appointment);
      const appointments = await appointmentRepository.find({ relations: ['patient'] });

      return response.json(appointments);
    } catch (error) {
      return response.status(400).json({ message: error.message });
    }
  }

  public async get(request: Request, response: Response): Promise<Response> {
    try {
      const { id } = request.params;

      const appointmentRepository = getRepository(Appointment);
      const appointment = await appointmentRepository.findOne(id, { relations: ['patient'] });

      return response.json(appointment);
    } catch (error) {
      return response.status(400).json({ message: error.message });
    }
  }

  public async update(request: Request, response: Response): Promise<Response> {
    try {
      const { id, date, note, patient } = request.body;

      const appointmentRepository = getRepository(Appointment);
      const result = await appointmentRepository.update(id, { date, note, patient });

      return response.status(204).json(result);
    } catch (error) {
      return response.status(400).json({ message: error.message });
    }
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    try {
      const { id } = request.params;

      const appointmentRepository = getRepository(Appointment);
      await appointmentRepository.delete(id);

      return response.status(204).send();
    } catch (error) {
      return response.status(400).json({ message: error.message });
    }
  }
}
