import { Request, Response } from 'express';
import { getRepository } from 'typeorm';

import Appointment from '../models/Appointment';
import Patient from '../models/Patient';

export default class AppointmentsController {
  public async update(request: Request, response: Response): Promise<Response> {
    try {
      const { id, note } = request.body;

      const appointmentRepository = getRepository(Appointment);
      const appointment = await appointmentRepository.findOne(id);
      appointment.note = note;

      await appointmentRepository.save(appointment);
      return response.status(204).json(appointment);
    } catch (error) {
      return response.status(400).json({ message: error.message });
    }
  }
}
