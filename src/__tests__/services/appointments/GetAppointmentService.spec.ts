import GetAppointmentService from '../../../services/appointments/GetAppointmentService';
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

  it('should be able to get appointment', async () => {
    const getAppointment = new GetAppointmentService();

    const db = { getRepository: jest.fn() };
    const appointmentRepository = { findOne: jest.fn() };

    db.getRepository.mockReturnValue(appointmentRepository);
    appointmentRepository.findOne.mockReturnValueOnce(Promise.resolve(appointmentObject));

    const result = await getAppointment.execute(appointment, appointmentRepository);

    expect(result.patient.id).toBe('145');
  });

  it('should not be able to get appointment', async () => {
    const getAppointment = new GetAppointmentService();

    const db = { getRepository: jest.fn() };
    const appointmentRepository = { findOne: jest.fn() };

    db.getRepository.mockReturnValue(appointmentRepository);
    appointmentRepository.findOne.mockReturnValueOnce(Promise.resolve(undefined));

    expect(getAppointment.execute(appointment, appointmentRepository)).rejects.toBeInstanceOf(AppError);
  });
});
