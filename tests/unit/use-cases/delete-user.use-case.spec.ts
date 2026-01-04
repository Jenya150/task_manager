import { UserRepositoryPort } from '../../../src/user/application/ports/user.repository.port';
import { DeleteUserUseCase } from '../../../src/user/application/use-cases/delete-user.use-case';
import { UserEntity } from '../../../src/user/domain/entities/user.entity';

const userRepoMock: UserRepositoryPort = {
  save: jest.fn(),
  findByUUID: jest.fn(),
  findAll: jest.fn(),
  update: jest.fn(),
  delete: jest.fn()
}

describe('DeleteUserUseCase', () => {
  let useCase: DeleteUserUseCase;

  beforeEach(() => {
    jest.clearAllMocks();
    useCase = new DeleteUserUseCase(userRepoMock);
  });

  test('should delete the user', async () => {
    const savedUser = UserEntity.create('TestUsername');

    userRepoMock.delete = jest.fn().mockResolvedValue(true);

    const result = await useCase.execute(savedUser.getUUID().getValue());

    expect(userRepoMock.delete).toHaveBeenCalledTimes(1);
    expect(result).toBeTruthy();
  })

  test('should do nothing', async () => {
    userRepoMock.delete = jest.fn().mockResolvedValue(false);

    const result = await useCase.execute('no user');

    expect(userRepoMock.delete).toHaveBeenCalledTimes(1);
    expect(result).toBeFalsy();
  })

});