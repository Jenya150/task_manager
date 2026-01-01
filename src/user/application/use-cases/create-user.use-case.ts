import { Inject, Injectable } from '@nestjs/common';
import { UserEntity } from '../../domain/entities/user.entity';
import {
  USER_REPOSITORY,
  type UserRepositoryPort,
} from '../ports/user.repository.port';
import { UsernameIsRequiredError } from '../../domain/errors';

export interface CreateUserDto {
  username: string;
  email?: string | null;
}

@Injectable()
export class CreateUserUseCase {
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly userRepository: UserRepositoryPort,
  ) {}

  async execute(dto: CreateUserDto): Promise<UserEntity | undefined> {
    if (dto.email == null) {
      dto.email = undefined;
    }
    try {
      const user = UserEntity.create(dto.username, dto.email);
      return this.userRepository.save(user);
    } catch (err) {
      throw new UsernameIsRequiredError(err?.message);
    }
  }
}
