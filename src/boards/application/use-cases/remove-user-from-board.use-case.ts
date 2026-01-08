import { Inject, Injectable } from '@nestjs/common';
import { BOARD_REPOSITORY, type BoardRepositoryPort } from '../ports/board.repository.port';
import { BoardNotFoundError } from '../../domain/errors';

@Injectable()
export class RemoveUserFromBoardUseCase {
  constructor(
    @Inject(BOARD_REPOSITORY)
    private readonly boardRepository: BoardRepositoryPort,
  ) {}

  async execute(idOfBoard: string, idOfUser: string) {
    const board = await this.boardRepository.findByUUID(idOfBoard);
    if (!board) {
      throw new BoardNotFoundError('Board not found.');
    }

    return board.removeUserFromBoard(idOfUser);
  }
}
