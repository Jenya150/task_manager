import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { type CreateBoardDto, CreateBoardUseCase } from '../application/use-cases/create-board.use-case';
import { GetBoardUseCase } from '../application/use-cases/get-board.use-case';
import { ListBoardsUseCase } from '../application/use-cases/list-boards.use-case';
import { DeleteBoardUseCase } from '../application/use-cases/delete-board.use-case';
import { type UpdateBoardDto, UpdateBoardUseCase } from '../application/use-cases/update-board.use-case';
import { BoardEntity } from '../domain/entities/board.entity';
import { BoardMapper } from './board.mapper';
import { AddUserToBoardUseCase } from '../application/use-cases/add-user-to-board.use-case';
import { ChangeUserRoleAtBoardUseCase } from '../application/use-cases/change-user-role-at-board.use-case';
import { RemoveUserFromBoardUseCase } from '../application/use-cases/remove-user-from-board.use-case';

@Controller('boards')
export class BoardController {
  constructor(
    private readonly createBoardUseCase: CreateBoardUseCase,
    private readonly getBoardUseCase: GetBoardUseCase,
    private readonly listBoardsUseCase: ListBoardsUseCase,
    private readonly deleteBoardUseCase: DeleteBoardUseCase,
    private readonly updateBoardUseCase: UpdateBoardUseCase,
    private readonly addUserToBoardUseCase: AddUserToBoardUseCase,
    private readonly changeUserRoleBoardUseCase: ChangeUserRoleAtBoardUseCase,
    private readonly removeUserFromBoardUseCase: RemoveUserFromBoardUseCase
  ) {}
  @Post()
  async createBoard(@Body() body: CreateBoardDto) {
    return await this.createBoardUseCase.execute(body);
  }

  @Get(':id')
  async getBoard(@Param('id') id: string) {
    const board = await this.getBoardUseCase.execute(id);

    return BoardMapper.fromEntity(board);
  }

  @Get()
  async listBoards() {
    const boards = await this.listBoardsUseCase.execute();

    return boards.map((board: BoardEntity) => BoardMapper.fromEntity(board));
  }

  @Patch(':id')
  async updateBoard(@Param('id') id: string, @Body() body: UpdateBoardDto) {
    const board = await this.updateBoardUseCase.execute(id, body);

    return BoardMapper.fromEntity(board);
  }

  @Delete(':id')
  deleteBoard(@Param('id') id: string) {
    return this.deleteBoardUseCase.execute(id);
  }
}