import UpdateAppointmentService from '../../../services/appointments/UpdateAppointmentService';
import Appointment from '../../../models/Appointment';
import looger from '../../../winston-custom-log';
import Patient from '../../../models/Patient';
import AppError from '../../../errors/AppErrors';

looger.transports[0].silent = true;
looger.transports[1].silent = true;

describe('UpdateAppointment', () => {
  const appointmentObject = new Appointment();
  appointmentObject.patient = new Patient();
  appointmentObject.patient.id = '145';

  const appointment = {
    id: '145',
    date: new Date('2020-09-19T03:47:05'),
    note: 'some note',
    patient: {
      id: '145',
    },
  };

  it('should be able to update appointment', async () => {
    const updateAppointment = new UpdateAppointmentService();

    const db = { getRepository: jest.fn() };
    const patientRepository = { findOne: jest.fn() };
    const appointmentRepository = { findOne: jest.fn(), update: jest.fn() };

    db.getRepository.mockReturnValue(patientRepository);
    patientRepository.findOne.mockReturnValue(Promise.resolve({}));

    db.getRepository.mockReturnValue(appointmentRepository);
    appointmentRepository.findOne.mockReturnValueOnce(Promise.resolve({})).mockReturnValueOnce(Promise.resolve(appointmentObject));
    appointmentRepository.update.mockReturnValue(Promise.resolve(true));

    const result = await updateAppointment.execute(appointment, patientRepository, appointmentRepository);

    expect(result.patient.id).toBe(appointment.patient.id);
  });

  it('should not be able to update appointment, because patient not found', async () => {
    const updateAppointment = new UpdateAppointmentService();

    const db = { getRepository: jest.fn() };
    const patientRepository = { findOne: jest.fn() };
    const appointmentRepository = { findOne: jest.fn(), update: jest.fn() };

    db.getRepository.mockReturnValue(patientRepository);
    patientRepository.findOne.mockReturnValue(Promise.resolve(undefined));

    db.getRepository.mockReturnValue(appointmentRepository);
    appointmentRepository.findOne.mockReturnValueOnce(Promise.resolve({})).mockReturnValueOnce(Promise.resolve(appointmentObject));
    appointmentRepository.update.mockReturnValue(Promise.resolve(true));

    expect(updateAppointment.execute(appointment, patientRepository, appointmentRepository)).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to update appointment, because appointment not found', async () => {
    const updateAppointment = new UpdateAppointmentService();

    const db = { getRepository: jest.fn() };
    const patientRepository = { findOne: jest.fn() };
    const appointmentRepository = { findOne: jest.fn(), update: jest.fn() };

    db.getRepository.mockReturnValue(patientRepository);
    patientRepository.findOne.mockReturnValue(Promise.resolve({}));

    db.getRepository.mockReturnValue(appointmentRepository);
    appointmentRepository.findOne.mockReturnValueOnce(Promise.resolve(undefined)).mockReturnValueOnce(Promise.resolve(appointmentObject));
    appointmentRepository.update.mockReturnValue(Promise.resolve(true));

    expect(updateAppointment.execute(appointment, patientRepository, appointmentRepository)).rejects.toBeInstanceOf(AppError);
  });
});
