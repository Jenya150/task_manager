import { UserRepositoryPort } from '../../../src/user/application/ports/user.repository.port';
import { UserEntity } from '../../../src/user/domain/entities/user.entity';
import { GetUserUseCase } from '../../../src/user/application/use-cases/get-user.use-case';
import { UserNotFoundError } from '../../../src/user/domain/errors';

const userRepoMock: UserRepositoryPort = {
  save: jest.fn(),
  findByUUID: jest.fn(),
  findAll: jest.fn(),
  update: jest.fn(),
  delete: jest.fn()
}

describe('GetUserUseCase', () => {
  let useCase: GetUserUseCase;

  beforeEach(() => {
    jest.clearAllMocks();
    useCase = new GetUserUseCase(userRepoMock);
  })

  test('should find and return user by id', async () => {
    const savedUser = UserEntity.create('TestUsername');

    userRepoMock.findByUUID = jest.fn().mockResolvedValue(savedUser);

    const result = await useCase.execute(savedUser.getUUID().getValue());

    expect(userRepoMock.findByUUID).toHaveBeenCalledTimes(1)
    expect(userRepoMock.findByUUID).toHaveBeenCalledWith(savedUser.getUUID().getValue());
    expect(result).toBe(savedUser)
  })

  test('should throw UserNotFoundError when user not found', async () => {
    userRepoMock.findByUUID = jest.fn().mockResolvedValue(null);

    await expect(useCase.execute('no user')).rejects.toThrow(UserNotFoundError);
    expect(userRepoMock.findByUUID).toHaveBeenCalledTimes(1);
    expect(userRepoMock.findByUUID).toHaveBeenCalledWith('no user');
  })
})