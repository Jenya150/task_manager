import { UserRepositoryPort } from '../../../src/users/application/ports/user.repository.port';
import { DeleteUserUseCase } from '../../../src/users/application/use-cases/delete-user.use-case';
import { UserEntity } from '../../../src/users/domain/entities/user.entity';

const userRepoMock: UserRepositoryPort = {
  save: jest.fn(),
  findByUUID: jest.fn(),
  findAll: jest.fn(),
  update: jest.fn(),
  delete: jest.fn()
}

describe('Delete users use case', () => {
  let useCase: DeleteUserUseCase;

  beforeEach(() => {
    jest.clearAllMocks();
    useCase = new DeleteUserUseCase(userRepoMock);
  });

  test('should delete the users', async () => {
    const savedUser = UserEntity.create('TestUsername');

    userRepoMock.delete = jest.fn().mockResolvedValue(true);

    const result = await useCase.execute(savedUser.getUUID().getValue());

    expect(userRepoMock.delete).toHaveBeenCalledTimes(1);
    expect(result).toBeTruthy();
  })

  test('should do nothing', async () => {
    userRepoMock.delete = jest.fn().mockResolvedValue(false);

    const result = await useCase.execute('no users');

    expect(userRepoMock.delete).toHaveBeenCalledTimes(1);
    expect(result).toBeFalsy();
  })

});