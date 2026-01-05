import { UserRepositoryPort } from '../../../src/users/application/ports/user.repository.port';
import { CreateUserUseCase } from '../../../src/users/application/use-cases/create-user.use-case';
import { UserEntity } from '../../../src/users/domain/entities/user.entity';
import { EmailIsInvalidError, UsernameIsInvalidError, UsernameIsRequiredError } from '../../../src/users/domain/errors';

const userRepoMock: UserRepositoryPort = {
  save: jest.fn(),
  findByUUID: jest.fn(),
  findAll: jest.fn(),
  update: jest.fn(),
  delete: jest.fn()
}

describe('Create users use case', () => {
  let useCase: CreateUserUseCase;

  beforeEach(() => {
    jest.clearAllMocks();
    useCase = new CreateUserUseCase(userRepoMock);
  });

  test('should create users when username is valid and email is not provided', async () => {
    const dto = { username: '123' };

    const savedUser = UserEntity.create('123');
    userRepoMock.save = jest.fn().mockResolvedValue(savedUser);

    const result = await useCase.execute(dto);

    expect(userRepoMock.save).toHaveBeenCalledTimes(1);
    expect(result).toBeInstanceOf(UserEntity);
    expect(result?.getUsername().getValue()).toBe('123');
    expect(result?.getEmail()).toBeUndefined();
  });

  test('should create users when username and email are valid', async () => {
    const dto = { username: 'testName', email: 'test@example.com' };

    const savedUser = UserEntity.create(dto.username, dto.email);
    userRepoMock.save = jest.fn().mockResolvedValue(savedUser);

    const result = await useCase.execute(dto);

    expect(userRepoMock.save).toHaveBeenCalledTimes(1);
    expect(result).toBeInstanceOf(UserEntity);
    expect(result?.getUsername().getValue()).toBe('testName');
    expect(result?.getEmail()?.getValue()).toBe("test@example.com");
  });

  test('should throw UsernameIsRequiredError when it is not username', async () => {
    const dto = { email: 'test@example.com' };

    await expect(useCase.execute(dto as any)).rejects.toThrow(UsernameIsRequiredError);
    expect(userRepoMock.save).not.toHaveBeenCalled();
  });

  test('should throw UsernameIsInvalidError when username is invalid', async () => {
    const dto = { username: '1', email: 'test@example.com' };

    await expect(useCase.execute(dto)).rejects.toThrow(UsernameIsInvalidError);
    expect(userRepoMock.save).not.toHaveBeenCalled();
  });

  test('should throw EmailIsInvalidError when email is invalid', async () => {
    const dto = { username: '123', email: 'test' };

    await expect(useCase.execute(dto)).rejects.toThrow(EmailIsInvalidError);
    expect(userRepoMock.save).not.toHaveBeenCalled();
  });
});
