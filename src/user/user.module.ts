import { Module } from '@nestjs/common';

import { UserController } from './presentation/user.controller';

import { CreateUserUseCase } from './application/use-cases/create-user.use-case';
import { GetUserUseCase } from './application/use-cases/get-user.use-case';
import { DeleteUserUseCase } from './application/use-cases/delete-user.use-case';
import { UpdateUserUseCase } from './application/use-cases/update-user.use-case';
import { ListUsersUseCase } from './application/use-cases/list-users.use-case';

import { USER_REPOSITORY } from './application/ports/user.repository.port';
import { MongoUserRepository } from './infrastructure-adapaters/mongo/mongo-user-repository.service';
import { MongooseModule } from '@nestjs/mongoose';
import {
  UserDocument,
  UserMongoSchema,
} from './infrastructure-adapaters/mongo/user.mongo.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: UserDocument.name, schema: UserMongoSchema },
    ]),
  ],
  controllers: [UserController],
  providers: [
    CreateUserUseCase,
    GetUserUseCase,
    DeleteUserUseCase,
    UpdateUserUseCase,
    ListUsersUseCase,
    {
      provide: USER_REPOSITORY,
      useClass: MongoUserRepository,
    },
  ],
})
export class UserModule {}
