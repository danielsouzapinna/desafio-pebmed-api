import DeletePatientService from '../../../services/patients/DeletePatientService';
import Patient from '../../../models/Patient';
import looger from '../../../winston-custom-log';
import AppError from '../../../errors/AppErrors';

looger.transports[0].silent = true;
looger.transports[1].silent = true;

describe('DeletePatient', () => {
  const patientObject = new Patient();
  patientObject.name = 'Gabriela Helena';

  const patient = {
    name: 'Gabriela Helena',
    dateBirth: new Date('1984-04-13T12:00:00'),
    gender: 'Female',
    height: 79,
    weight: 1.76,
    telephone: '21-99477-9525',
    appointments: null,
    created_at: Date(),
    updated_at: Date(),
  };

  it('should be able to delete a patient', async () => {
    const deletePatient = new DeletePatientService();

    const db = { getRepository: jest.fn() };
    const repository = { findOne: jest.fn(), delete: jest.fn() };

    db.getRepository.mockReturnValue(repository);
    repository.findOne.mockReturnValue(Promise.resolve(patientObject));
    repository.delete.mockReturnValue(Promise.resolve(true));

    const result = await deletePatient.execute({ id: '145' }, repository);

    expect(result).toBe(undefined);
  });

  it('should not be able to get a patient', async () => {
    const deletePatient = new DeletePatientService();

    const db = { getRepository: jest.fn() };
    const repository = { findOne: jest.fn() };

    db.getRepository.mockReturnValue(repository);
    repository.findOne.mockReturnValue(Promise.resolve(undefined));

    expect(deletePatient.execute({ id: '145' }, repository)).rejects.toBeInstanceOf(AppError);
  });
});
