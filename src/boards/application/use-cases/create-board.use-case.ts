import { Inject, Injectable } from '@nestjs/common';
import { BOARD_REPOSITORY, type BoardRepositoryPort } from '../ports/board.repository.port';
import { BoardEntity } from '../../domain/entities/board.entity';

export interface CreateBoardDto {
  title: string;
  uuidOfUserOwner: string;
  description?: string | null;
}

@Injectable()
export class CreateBoardUseCase {
  constructor(
    @Inject(BOARD_REPOSITORY)
    private readonly boardRepository: BoardRepositoryPort,
  ) {}

  async execute(dto: CreateBoardDto): Promise<BoardEntity | undefined> {
    if (dto.description == null) {
      dto.description = undefined;
    }

    const board = BoardEntity.create(dto.title, dto.uuidOfUserOwner, dto.description);
    return this.boardRepository.save(board);
  }
}
