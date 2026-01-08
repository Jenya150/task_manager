import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';

import {
  type CreateUserDto,
  CreateUserUseCase,
} from '../application/use-cases/create-user.use-case';
import { GetUserUseCase } from '../application/use-cases/get-user.use-case';
import { ListUsersUseCase } from '../application/use-cases/list-users.use-case';
import { DeleteUserUseCase } from '../application/use-cases/delete-user.use-case';
import {
  type UpdateUserDto,
  UpdateUserUseCase,
} from '../application/use-cases/update-user.use-case';

import { UserMapper } from './user.mapper';
import { UserEntity } from '../domain/entities/user.entity';

@Controller('users')
export class UserController {
  constructor(
    private readonly createUserUseCase: CreateUserUseCase,
    private readonly getUserUseCase: GetUserUseCase,
    private readonly listUsersUseCase: ListUsersUseCase,
    private readonly deleteUserUseCase: DeleteUserUseCase,
    private readonly updateUserUseCase: UpdateUserUseCase,
  ) {}

  @Post()
  async createUser(@Body() body: CreateUserDto) {
    return await this.createUserUseCase.execute(body);
  }

  @Get(':id')
  async getUser(@Param('id') id: string) {
    const user = await this.getUserUseCase.execute(id);

    return UserMapper.fromEntity(user);
  }

  @Get()
  async listUsers() {
    const users = await this.listUsersUseCase.execute();

    return users.map((user: UserEntity) => UserMapper.fromEntity(user));
  }

  @Patch(':id')
  async updateUser(@Param('id') id: string, @Body() body: UpdateUserDto) {
    const user = await this.updateUserUseCase.execute(id, body);

    return UserMapper.fromEntity(user);
  }

  @Delete(':id')
  deleteUser(@Param('id') id: string) {
    return this.deleteUserUseCase.execute(id);
  }
}
