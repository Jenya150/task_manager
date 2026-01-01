import { UserEntity } from '../domain/entities/user.entity';

export class UserMapper {
  static fromEntity(user: UserEntity) {
    return {
      uuid: user.getUUID().getValue(),
      username: user.getUsername(),
      email: user.getEmail(),
      activeProjectIds: user.getActiveProjects(),
      ownerProjectIds: user.getOwnerProjectIds(),
      createdAt: user.getCreatedAt(),
      updatedAt: user.getUpdatedAt(),
      accountAge: user.getAccountAge(),
    };
  }
}
