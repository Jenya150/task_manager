import { UserRepositoryPort } from '../../../src/user/application/ports/user.repository.port';
import { UpdateUserUseCase } from '../../../src/user/application/use-cases/update-user.use-case';
import { UserEntity } from '../../../src/user/domain/entities/user.entity';
import { EmailIsInvalidError, UsernameIsInvalidError, UserNotFoundError } from '../../../src/user/domain/errors';

const userRepoMock: UserRepositoryPort = {
  save: jest.fn(),
  findByUUID: jest.fn(),
  findAll: jest.fn(),
  update: jest.fn(),
  delete: jest.fn()
}

describe('UpdateUserUseCase', () => {
  let useCase: UpdateUserUseCase;

  let savedUser: UserEntity;
  let oldUpdatedAt: Date;

  beforeEach(() => {
    jest.clearAllMocks()
    useCase = new UpdateUserUseCase(userRepoMock);

    savedUser = UserEntity.create('TestUsername', 'TestEmail@mail.com');
    oldUpdatedAt = savedUser.getUpdatedAt()

    userRepoMock.findByUUID = jest.fn().mockResolvedValue(savedUser);
    userRepoMock.update = jest.fn().mockResolvedValue(savedUser);
  });

  test('should return an user without updates', async () => {
    const dto = {}

    const result = await useCase.execute(savedUser.getUUID().getValue(), dto)

    expect(userRepoMock.findByUUID).toHaveBeenCalledTimes(1);
    expect(userRepoMock.update).toHaveBeenCalledTimes(1);
    expect(result.getUsername().getValue()).toEqual(savedUser.getUsername().getValue());
    expect(result.getEmail()?.getValue()).toEqual(savedUser.getEmail()?.getValue());
    expect(result.getUpdatedAt().getTime()).toBe(oldUpdatedAt.getTime());
  })

  test('should return an updated user', async () => {
    const dto = {username: 'NewTestUsername', email: 'NewTestEmail@mail.com'};

    await new Promise(r => setTimeout(r, 1))

    const result = await useCase.execute(savedUser.getUUID().getValue(), dto)

    expect(userRepoMock.findByUUID).toHaveBeenCalledTimes(1);
    expect(userRepoMock.update).toHaveBeenCalledTimes(1);
    expect(result.getUsername().getValue()).toEqual(dto.username);
    expect(result.getEmail()?.getValue()).toEqual(dto.email);
    expect(result.getUpdatedAt().getTime()).toBeGreaterThan(oldUpdatedAt.getTime());
  })

  test('should return an user without email', async () => {
    const dto = { email: null }

    await new Promise(r => setTimeout(r, 1))

    const result = await useCase.execute(savedUser.getUUID().getValue(), dto)

    expect(userRepoMock.findByUUID).toHaveBeenCalledTimes(1);
    expect(userRepoMock.update).toHaveBeenCalledTimes(1);
    expect(result.getUsername().getValue()).toEqual(savedUser.getUsername().getValue());
    expect(result.getEmail()?.getValue()).toBeUndefined();
    expect(result.getUpdatedAt().getTime()).toBeGreaterThan(oldUpdatedAt.getTime());
  })

  test('should throw UserNotFoundError when there is no user', async () => {
    const dto = { username: 'NewTestUsername' }

    userRepoMock.findByUUID = jest.fn().mockResolvedValue(null);

    await expect(useCase.execute(savedUser.getUUID().getValue(), dto)).rejects.toThrow(UserNotFoundError);
    expect(userRepoMock.findByUUID).toHaveBeenCalledTimes(1);
    expect(userRepoMock.update).toHaveBeenCalledTimes(0);
  })

  test('should throw UsernameIsInvalidError when username is invalid', async () => {
    const dto = { username: '1', email: 'test@example.com' };

    await expect(useCase.execute(savedUser.getUUID().getValue(), dto)).rejects.toThrow(UsernameIsInvalidError);
    expect(userRepoMock.findByUUID).toHaveBeenCalledTimes(1);
    expect(userRepoMock.update).not.toHaveBeenCalled();
  });

  test('should throw EmailIsInvalidError when email is invalid', async () => {
    const dto = { username: '123', email: 'test' };

    await expect(useCase.execute(savedUser.getUUID().getValue(), dto)).rejects.toThrow(EmailIsInvalidError);
    expect(userRepoMock.findByUUID).toHaveBeenCalledTimes(1);
    expect(userRepoMock.update).not.toHaveBeenCalled();
  });
})