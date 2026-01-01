import { UserEntity } from '../../domain/entities/user.entity';

export interface UserRepositoryPort {
  save: (user: UserEntity) => Promise<UserEntity | undefined>;
  findByUUID: (uuid: string) => Promise<UserEntity | null>;
  findAll: (limit?: number, offset?: number) => Promise<UserEntity[]>;
  update: (user: UserEntity) => Promise<UserEntity>;
  delete: (id: string) => Promise<boolean>;
}

export const USER_REPOSITORY = Symbol('USER_REPOSITORY');
