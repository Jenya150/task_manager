import { BoardEntity } from '../domain/entities/board.entity';

export class BoardMapper {
  static fromEntity(board: BoardEntity) {
    return {
      uuid: board.getUUID().getValue(),
      title: board.getTitle().getValue(),
      description: board.getDescription()?.getValue(),
      uuidOfUserOwner: board.getUuidOfUserOwner().getValue(),
      users: Array.from(board.getUsers(), ([id, role]) => ({ id, role })),
    };
  }
}