import CreatePatientService from '../../../services/patients/CreatePatientService';
import Patient from '../../../models/Patient';
import looger from '../../../winston-custom-log';
import AppError from '../../../errors/AppErrors';

looger.transports[0].silent = true;
looger.transports[1].silent = true;

describe('CreatePatient', () => {
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

  it('should be able to create new patient', async () => {
    const createPatient = new CreatePatientService();

    const db = { getRepository: jest.fn() };
    const repository = { findOne: jest.fn(), create: jest.fn(), save: jest.fn() };

    db.getRepository.mockReturnValue(repository);
    repository.findOne.mockReturnValue(Promise.resolve(undefined));
    repository.create.mockReturnValue(Promise.resolve(patientObject));
    repository.save.mockReturnValue(Promise.resolve(true));

    const result = await createPatient.execute(patient, repository);

    expect(result.name).toBe(patient.name);
  });

  it('should not be able to create new patient, because patient already exist', async () => {
    const createPatient = new CreatePatientService();

    const db = { getRepository: jest.fn() };
    const repository = { findOne: jest.fn(), create: jest.fn(), save: jest.fn() };

    db.getRepository.mockReturnValue(repository);
    repository.findOne.mockReturnValue(Promise.resolve({}));
    repository.create.mockReturnValue(Promise.resolve(patientObject));
    repository.save.mockReturnValue(Promise.resolve(true));

    expect(createPatient.execute(patient, repository)).rejects.toBeInstanceOf(AppError);
  });
});
