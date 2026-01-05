import { UserRepositoryPort } from '../../../src/users/application/ports/user.repository.port';
import { ListUsersUseCase } from '../../../src/users/application/use-cases/list-users.use-case';
import { UserEntity } from '../../../src/users/domain/entities/user.entity';

const userRepoMock: UserRepositoryPort = {
  save: jest.fn(),
  findByUUID: jest.fn(),
  findAll: jest.fn(),
  update: jest.fn(),
  delete: jest.fn()
}

describe('List users use case', () => {
  let useCase: ListUsersUseCase;

  beforeEach(() => {
    jest.clearAllMocks()
    useCase = new ListUsersUseCase(userRepoMock);
  });

  test('should return empty list of users entity', async () => {
    userRepoMock.findAll = jest.fn().mockResolvedValue([]);

    const result = await useCase.execute();

    expect(userRepoMock.findAll).toHaveBeenCalledTimes(1)
    expect(userRepoMock.findAll).toHaveBeenCalledWith()
    expect(result).toEqual([]);
  })

  test('should return empty list of users entity', async () => {
    const savedUser1 = UserEntity.create('TestUsername1', 'TestEmail@mail.com');
    const savedUser2 = UserEntity.create('TestUsername2', 'TestEmail@mail.com');

    userRepoMock.findAll = jest.fn().mockResolvedValue([savedUser1, savedUser2]);

    const result = await useCase.execute();

    expect(userRepoMock.findAll).toHaveBeenCalledTimes(1)
    expect(result).toHaveLength(2)
    expect(result.every(user => user instanceof UserEntity)).toBeTruthy();
  })
})
