import { UserDocument } from './user.mongo.schema';
import { UserEntity } from '../../domain/entities/user.entity';
import { UserUUID } from '../../domain/value-objects/user-uuid.vo';
import { UserUsername } from '../../domain/value-objects/user-username.vo';
import { UserEmail } from '../../domain/value-objects/user-email.vo';

export class UserMongoMapper {
  static toEntity(user: UserDocument): UserEntity {
    const email = user.email ? new UserEmail(user.email) : undefined;

    return new UserEntity(
      new UserUUID(user.uuid),
      new UserUsername(user.username),
      user.activeProjectIds,
      user.ownerProjectIds,
      user.createdAt,
      user.updatedAt,
      email,
    );
  }
}
