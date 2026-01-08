import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { BoardController } from './presentation/boards.controller';

import {
  BoardDocument,
  BoardMongoSchema,
} from './infrastucture-adapaters/mongo/board.mongo.schema';

import { MongoBoardRepository } from './infrastucture-adapaters/mongo/mongo-board-repository.service';
import { BOARD_REPOSITORY } from './application/ports/board.repository.port';

import { CreateBoardUseCase } from './application/use-cases/create-board.use-case';
import { GetBoardUseCase } from './application/use-cases/get-board.use-case';
import { DeleteBoardUseCase } from './application/use-cases/delete-board.use-case';
import { UpdateBoardUseCase } from './application/use-cases/update-board.use-case';
import { ListBoardsUseCase } from './application/use-cases/list-boards.use-case';
import { AddUserToBoardUseCase } from './application/use-cases/add-user-to-board.use-case';
import { ChangeUserRoleAtBoardUseCase } from './application/use-cases/change-user-role-at-board.use-case';
import { RemoveUserFromBoardUseCase } from './application/use-cases/remove-user-from-board.use-case';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: BoardDocument.name, schema: BoardMongoSchema },
    ]),
  ],
  controllers: [BoardController],
  providers: [
    CreateBoardUseCase,
    GetBoardUseCase,
    DeleteBoardUseCase,
    UpdateBoardUseCase,
    ListBoardsUseCase,
    AddUserToBoardUseCase,
    ChangeUserRoleAtBoardUseCase,
    RemoveUserFromBoardUseCase,
    {
      provide: BOARD_REPOSITORY,
      useClass: MongoBoardRepository,
    },
  ],
})
export class BoardModule {}
