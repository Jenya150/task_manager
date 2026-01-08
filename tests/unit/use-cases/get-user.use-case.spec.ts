import { UserRepositoryPort } from '../../../src/users/application/ports/user.repository.port';
import { UserEntity } from '../../../src/users/domain/entities/user.entity';
import { GetUserUseCase } from '../../../src/users/application/use-cases/get-user.use-case';
import { UserNotFoundError } from '../../../src/users/domain/errors';

const userRepoMock: UserRepositoryPort = {
  save: jest.fn(),
  findByUUID: jest.fn(),
  findAll: jest.fn(),
  update: jest.fn(),
  delete: jest.fn(),
};

describe('Get users use case', () => {
  let useCase: GetUserUseCase;

  beforeEach(() => {
    jest.clearAllMocks();
    useCase = new GetUserUseCase(userRepoMock);
  });

  test('should find and return users by id', async () => {
    const savedUser = UserEntity.create('TestUsername');

    userRepoMock.findByUUID = jest.fn().mockResolvedValue(savedUser);

    const result = await useCase.execute(savedUser.getUUID().getValue());

    expect(userRepoMock.findByUUID).toHaveBeenCalledTimes(1);
    expect(userRepoMock.findByUUID).toHaveBeenCalledWith(
      savedUser.getUUID().getValue(),
    );
    expect(result).toBe(savedUser);
  });

  test('should throw UserNotFoundError when users not found', async () => {
    userRepoMock.findByUUID = jest.fn().mockResolvedValue(null);

    await expect(useCase.execute('no users')).rejects.toThrow(
      UserNotFoundError,
    );
    expect(userRepoMock.findByUUID).toHaveBeenCalledTimes(1);
    expect(userRepoMock.findByUUID).toHaveBeenCalledWith('no users');
  });
});
