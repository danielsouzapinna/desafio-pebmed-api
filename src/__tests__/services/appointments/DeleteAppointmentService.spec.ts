import DeleteAppointmentService from '../../../services/appointments/DeleteAppointmentService';
import Appointment from '../../../models/Appointment';
import looger from '../../../winston-custom-log';
import Patient from '../../../models/Patient';
import AppError from '../../../errors/AppErrors';

looger.transports[0].silent = true;
looger.transports[1].silent = true;

describe('DeleteAppointment', () => {
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

  it('should be able to delete appointment', async () => {
    const deleteAppointment = new DeleteAppointmentService();

    const db = { getRepository: jest.fn() };
    const appointmentRepository = { findOne: jest.fn(), delete: jest.fn() };

    db.getRepository.mockReturnValue(appointmentRepository);
    appointmentRepository.findOne.mockReturnValueOnce(Promise.resolve({}));
    appointmentRepository.delete.mockReturnValueOnce(Promise.resolve(true));

    const result = await deleteAppointment.execute(appointment, appointmentRepository);

    expect(result).toBe(undefined);
  });

  it('should not be able to delete appointment', async () => {
    const deleteAppointment = new DeleteAppointmentService();

    const db = { getRepository: jest.fn() };
    const appointmentRepository = { findOne: jest.fn(), delete: jest.fn() };

    db.getRepository.mockReturnValue(appointmentRepository);
    appointmentRepository.findOne.mockReturnValueOnce(Promise.resolve(undefined));

    expect(deleteAppointment.execute(appointment, appointmentRepository)).rejects.toBeInstanceOf(AppError);
  });
});
