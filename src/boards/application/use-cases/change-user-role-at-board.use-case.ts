import { Inject, Injectable } from '@nestjs/common';
import { BOARD_REPOSITORY, type BoardRepositoryPort } from '../ports/board.repository.port';
import { BoardNotFoundError } from '../../domain/errors';

@Injectable()
export class ChangeUserRoleAtBoardUseCase {
  constructor(
    @Inject(BOARD_REPOSITORY)
    private readonly boardRepository: BoardRepositoryPort,
  ) {}

  async execute(idOfBoard: string, idOfUser: string, role: string) {
    const board = await this.boardRepository.findByUUID(idOfBoard);
    if (!board) {
      throw new BoardNotFoundError('Board not found.');
    }

    return board.changeUserRoleInBoard(idOfUser, role);
  }
}
