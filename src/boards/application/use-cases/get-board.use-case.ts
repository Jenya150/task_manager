import { Inject, Injectable } from '@nestjs/common';
import {
  BOARD_REPOSITORY,
  type BoardRepositoryPort,
} from '../ports/board.repository.port';
import { BoardNotFoundError } from '../../domain/errors';

@Injectable()
export class GetBoardUseCase {
  constructor(
    @Inject(BOARD_REPOSITORY)
    private readonly boardRepository: BoardRepositoryPort,
  ) {}

  async execute(id: string) {
    const board = await this.boardRepository.findByUUID(id);
    if (!board) {
      throw new BoardNotFoundError('Board not found.');
    }

    return board;
  }
}
