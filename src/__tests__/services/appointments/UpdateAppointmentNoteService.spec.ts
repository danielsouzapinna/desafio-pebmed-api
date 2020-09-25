import UpdateAppointmentNoteService from '../../../services/appointments/UpdateAppointmentNoteService';
import Appointment from '../../../models/Appointment';
import looger from '../../../winston-custom-log';
import Patient from '../../../models/Patient';
import AppError from '../../../errors/AppErrors';

looger.transports[0].silent = true;
looger.transports[1].silent = true;

describe('UpdateAppointmentNote', () => {
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

  it('should be able to update appointment note', async () => {
    const updateAppointmentNote = new UpdateAppointmentNoteService();

    const db = { getRepository: jest.fn() };
    const appointmentRepository = { findOne: jest.fn(), save: jest.fn() };

    db.getRepository.mockReturnValue(appointmentRepository);
    appointmentRepository.findOne.mockReturnValueOnce(Promise.resolve(appointmentObject));
    appointmentRepository.save.mockReturnValue(Promise.resolve(true));

    const result = await updateAppointmentNote.execute(appointment, appointmentRepository);

    expect(result.patient.id).toBe(appointment.patient.id);
  });

  it('should not be able to update appointment note', async () => {
    const updateAppointmentNote = new UpdateAppointmentNoteService();

    const db = { getRepository: jest.fn() };
    const appointmentRepository = { findOne: jest.fn(), save: jest.fn() };

    db.getRepository.mockReturnValue(appointmentRepository);
    appointmentRepository.findOne.mockReturnValueOnce(Promise.resolve(undefined));
    appointmentRepository.save.mockReturnValue(Promise.resolve(true));

    expect(updateAppointmentNote.execute(appointment, appointmentRepository)).rejects.toBeInstanceOf(AppError);
  });
});
