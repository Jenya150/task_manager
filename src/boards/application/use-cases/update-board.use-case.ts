import { Inject, Injectable } from '@nestjs/common';
import { BOARD_REPOSITORY, type BoardRepositoryPort } from '../ports/board.repository.port';
import { BoardNotFoundError } from '../../domain/errors';

export interface UpdateBoardDto {
  title?: string;
  uuidOfUserOwner?: string;
  description?: string | null;
}

@Injectable()
export class UpdateBoardUseCase {
  constructor(
    @Inject(BOARD_REPOSITORY)
    private readonly boardRepository: BoardRepositoryPort,
  ) {}

  async execute(id: string, dto: UpdateBoardDto) {
    const board = await this.boardRepository.findByUUID(id);

    if (!board) {
      throw new BoardNotFoundError('Board not found.');
    }

    if (dto.title !== undefined) {
      board.updateTitle(dto.title);
    }

    if (dto.uuidOfUserOwner !== undefined) {
      board.updateUuidOwner(dto.uuidOfUserOwner);
    }

    if (dto.description !== undefined) {
      board.updateDescription(dto.description);
    }

    return this.boardRepository.update(board);
  }
}
