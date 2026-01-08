import { BoardEntity } from '../../domain/entities/board.entity';

export interface BoardRepositoryPort {
  save: (board: BoardEntity) => Promise<BoardEntity | undefined>;
  findByUUID: (uuid: string) => Promise<BoardEntity | null>;
  findAll: (limit?: number, offset?: number) => Promise<BoardEntity[]>;
  update: (board: BoardEntity) => Promise<BoardEntity>;
  delete: (uuid: string) => Promise<boolean>;
}

export const BOARD_REPOSITORY = Symbol('BOARD_REPOSITORY');