import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import {
  USER_REPOSITORY,
  type UserRepositoryPort,
} from '../ports/user.repository.port';
import { UsernameIsInvalidError, UsernameIsRequiredError, UserNotFoundError } from '../../domain/errors';

export interface UpdateUserDto {
  username?: string;
  email?: string | null;
}

@Injectable()
export class UpdateUserUseCase {
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly userRepository: UserRepositoryPort,
  ) {}

  async execute(id: string, dto: UpdateUserDto) {
    const user = await this.userRepository.findByUUID(id);

    if (!user) {
      throw new UserNotFoundError('User not found.');
    }

    if (dto.username !== undefined) {
      user.updateUsername(dto.username);
    }

    if (dto.email !== undefined) {
      user.updateEmail(dto.email);
    }

    return this.userRepository.update(user);
  }
}
