import { Inject, Injectable } from '@nestjs/common';
import { BOARD_REPOSITORY, type BoardRepositoryPort } from '../ports/board.repository.port';

@Injectable()
export class DeleteBoardUseCase {
  constructor(
    @Inject(BOARD_REPOSITORY)
    private readonly boardRepository: BoardRepositoryPort,
  ) {}

  execute(uuid: string) {
    return this.boardRepository.delete(uuid);
  }
}
