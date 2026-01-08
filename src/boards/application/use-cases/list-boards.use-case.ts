import { Inject, Injectable } from '@nestjs/common';
import {
  BOARD_REPOSITORY,
  type BoardRepositoryPort,
} from '../ports/board.repository.port';

@Injectable()
export class ListBoardsUseCase {
  constructor(
    @Inject(BOARD_REPOSITORY)
    private readonly boardRepository: BoardRepositoryPort,
  ) {}

  execute() {
    return this.boardRepository.findAll();
  }
}
