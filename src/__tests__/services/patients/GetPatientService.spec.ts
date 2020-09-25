import GetPatientService from '../../../services/patients/GetPatientService';
import Patient from '../../../models/Patient';
import looger from '../../../winston-custom-log';
import AppError from '../../../errors/AppErrors';

looger.transports[0].silent = true;
looger.transports[1].silent = true;

describe('GetPatient', () => {
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

  it('should be able to get a patient', async () => {
    const getPatient = new GetPatientService();

    const db = { getRepository: jest.fn() };
    const repository = { findOne: jest.fn() };

    db.getRepository.mockReturnValue(repository);
    repository.findOne.mockReturnValue(Promise.resolve(patientObject));

    const result = await getPatient.execute({ id: '145' }, repository);

    expect(result.name).toBe(patient.name);
  });

  it('should not be able to get a patient', async () => {
    const getPatient = new GetPatientService();

    const db = { getRepository: jest.fn() };
    const repository = { findOne: jest.fn() };

    db.getRepository.mockReturnValue(repository);
    repository.findOne.mockReturnValue(Promise.resolve(undefined));

    expect(
      getPatient.execute(
        {
          id: '145',
        },
        repository,
      ),
    ).rejects.toBeInstanceOf(AppError);
  });
});
