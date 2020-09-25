import CreateAppointmentService from '../../../services/appointments/CreateAppointmentService';
import Appointment from '../../../models/Appointment';
import looger from '../../../winston-custom-log';
import Patient from '../../../models/Patient';
import AppError from '../../../errors/AppErrors';

looger.transports[0].silent = true;
looger.transports[1].silent = true;

describe('CreateAppointment', () => {
  const appointmentObject = new Appointment();
  appointmentObject.patient = new Patient();
  appointmentObject.patient.id = '145';

  const appointment = {
    patientId: '145',
    appointmentDate: new Date('2020-09-19T03:47:05'),
  };

  it('should be able to create new appointment', async () => {
    const createAppointment = new CreateAppointmentService();

    const db = { getRepository: jest.fn() };
    const patientRepository = { findOne: jest.fn() };
    const appointmentRepository = { create: jest.fn(), save: jest.fn() };

    db.getRepository.mockReturnValue(patientRepository);
    patientRepository.findOne.mockReturnValue(Promise.resolve({}));

    db.getRepository.mockReturnValue(appointmentRepository);
    appointmentRepository.create.mockReturnValue(Promise.resolve(appointmentObject));
    appointmentRepository.save.mockReturnValue(Promise.resolve(true));

    const result = await createAppointment.execute(appointment, patientRepository, appointmentRepository);

    expect(result.patient.id).toBe(appointment.patientId);
  });

  it('should not be able to create new appointment', async () => {
    const createAppointment = new CreateAppointmentService();

    const db = { getRepository: jest.fn() };
    const patientRepository = { findOne: jest.fn() };
    const appointmentRepository = { create: jest.fn(), save: jest.fn() };

    db.getRepository.mockReturnValue(patientRepository);
    patientRepository.findOne.mockReturnValue(Promise.resolve(undefined));

    db.getRepository.mockReturnValue(appointmentRepository);
    appointmentRepository.create.mockReturnValue(Promise.resolve(appointmentObject));
    appointmentRepository.save.mockReturnValue(Promise.resolve(true));

    expect(createAppointment.execute(appointment, patientRepository, appointmentRepository)).rejects.toBeInstanceOf(AppError);
  });
});
