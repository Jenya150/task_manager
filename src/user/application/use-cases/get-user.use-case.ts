import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import {
  USER_REPOSITORY,
  type UserRepositoryPort,
} from '../ports/user.repository.port';
import { UserNotFoundError } from '../../domain/errors';

@Injectable()
export class GetUserUseCase {
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly userRepository: UserRepositoryPort,
  ) {}

  async execute(id: string) {
    const user = await this.userRepository.findByUUID(id);
    if (!user) {
      throw new UserNotFoundError('User not found.');
    }

    return user;
  }
}
