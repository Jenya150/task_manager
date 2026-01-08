import { BoardDocument } from './board.mongo.schema';
import { BoardEntity } from '../../domain/entities/board.entity';
import { BoardDescription } from '../../domain/value-objects/board-description.vo';
import { BoardUUID } from '../../domain/value-objects/board-uuid.vo';
import { BoardTittle } from '../../domain/value-objects/board-title.vo';
import { BoardUserOwnerUuid } from '../../domain/value-objects/board-user-owner-uuid.vo';
import { BoardUsersRoles } from '../../domain/value-objects/board-users-roles.vo';

export class BoardMongoMapper {
  static toEntity(board: BoardDocument): BoardEntity {
    const description = board.description ? new BoardDescription(board.description) : undefined;
    const users = board.users
    const usersMap = new Map<string, BoardUsersRoles>();

    for(let index = 0; index < users.length; index++) {
      usersMap.set(String(users[index].uuid), new BoardUsersRoles(String(users[index].role)))
    }

    return new BoardEntity(
      new BoardUUID(board.uuid),
      new BoardTittle(board.title),
      new BoardUserOwnerUuid(board.uuidOfUserOwner),
      usersMap,
      board.createdAt,
      board.updatedAt,
      description
    );
  }
}
