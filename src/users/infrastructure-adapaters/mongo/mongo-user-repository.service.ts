import {
  BadRequestException,
  Injectable,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { UserRepositoryPort } from '../../application/ports/user.repository.port';

import { UserEntity } from '../../domain/entities/user.entity';
import { UserMongoMapper } from './user.mongo.mapper';
import { UserDocument } from './user.mongo.schema';
import { UserNotFoundError } from '../../domain/errors';

@Injectable()
export class MongoUserRepository implements UserRepositoryPort {
  constructor(
    @InjectModel(UserDocument.name)
    private userModel: Model<UserDocument>,
  ) {}

  async save(user: UserEntity) {
    try {
      const newUser = await this.userModel.create({
        uuid: user.getUUID().getValue(),
        username: user.getUsername().getValue(),
        email: user.getEmail()?.getValue(),
        activeProjectIds: user.getActiveProjects(),
        ownerProjectIds: user.getOwnerProjectIds(),
        createdAt: new Date(),
        updatedAt: new Date(),
      });
      return UserMongoMapper.toEntity(newUser);
    } catch (err) {
      if (err?.code === 11000) {
        throw new BadRequestException('Email already exists.');
      }
      throw err;
    }
  }

  async findByUUID(uuid: string) {
    const user = await this.userModel.findOne({ uuid: uuid }).exec();

    if (!user) {
      return null;
    }

    return UserMongoMapper.toEntity(user);
  }

  async findAll(limit: number = 10000, offset: number = 0) {
    const listOfUsers = await this.userModel
      .find()
      .skip(offset)
      .limit(limit)
      .exec();

    return listOfUsers.map(UserMongoMapper.toEntity);
  }

  async update(updatedUserDoc: UserEntity) {
    const userDoc = await this.userModel
      .findOne({ uuid: updatedUserDoc.getUUID().getValue() })
      .exec();

    if (!userDoc) {
      throw new UserNotFoundError("User doesn't exist.");
    }

    userDoc.email = updatedUserDoc.getEmail()?.getValue() ?? undefined;
    userDoc.username = updatedUserDoc.getUsername().getValue();

    try {
      const updatedUser = await userDoc.save();
      return UserMongoMapper.toEntity(updatedUser);
    } catch (err) {
      if (err?.code === 11000) {
        throw new BadRequestException('Email already exists.');
      }
      throw err;
    }
  }

  async delete(uuid: string) {
    const result = await this.userModel.deleteOne({ uuid }).exec();

    return result.deletedCount > 0;
  }
}
