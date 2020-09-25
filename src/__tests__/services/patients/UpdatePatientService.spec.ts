import UpdatePatientService from '../../../services/patients/UpdatePatientService';
import Patient from '../../../models/Patient';
import looger from '../../../winston-custom-log';
import AppError from '../../../errors/AppErrors';

looger.transports[0].silent = true;
looger.transports[1].silent = true;

describe('UpdatePatient', () => {
  const patientObject = new Patient();
  patientObject.name = 'Gabriela Helena';

  const patient = {
    id: '145',
    name: 'Daniel Pinna',
    dateBirth: new Date('1984-04-13T12:00:00'),
    gender: 'Female',
    height: 79,
    weight: 1.76,
    telephone: '21-99477-9525',
    appointments: null,
    created_at: Date(),
    updated_at: Date(),
  };

  it('should be able to update a patient', async () => {
    const updatePatient = new UpdatePatientService();

    const db = { getRepository: jest.fn() };
    const repository = { findOne: jest.fn(), update: jest.fn() };

    db.getRepository.mockReturnValue(repository);
    repository.findOne.mockReturnValueOnce(Promise.resolve(patientObject)).mockReturnValueOnce(Promise.resolve(patient));
    repository.update.mockReturnValue(Promise.resolve(true));

    const result = await updatePatient.execute(patient, repository);

    expect(result.name).toBe(patient.name);
  });

  it('should not be able to get a patient', async () => {
    const updatePatient = new UpdatePatientService();

    const db = { getRepository: jest.fn() };
    const repository = { findOne: jest.fn(), update: jest.fn() };

    db.getRepository.mockReturnValue(repository);
    repository.findOne.mockReturnValue(Promise.resolve(undefined));

    expect(updatePatient.execute(patient, repository)).rejects.toBeInstanceOf(AppError);
  });
});
