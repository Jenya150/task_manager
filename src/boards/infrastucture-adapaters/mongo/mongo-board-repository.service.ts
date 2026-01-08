import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BoardRepositoryPort } from '../../application/ports/board.repository.port';
import { BoardDocument } from './board.mongo.schema';
import { BoardEntity } from '../../domain/entities/board.entity';
import { BoardMongoMapper } from './board.mongo.mapper';
import { BoardNotFoundError } from '../../domain/errors';

@Injectable()
export class MongoBoardRepository implements BoardRepositoryPort {
  constructor(
    @InjectModel(BoardDocument.name)
    private boardModel: Model<BoardDocument>,
  ) {}

  async save(board: BoardEntity) {
    const boardDoc = await this.boardModel.findOne({
      uuid: board.getUUID().getValue(),
    });

    if (!boardDoc) {
      const newBoard = await this.boardModel.create({
        uuid: board.getUUID().getValue(),
        title: board.getTitle().getValue(),
        description: board.getDescription()?.getValue(),
        uuidOfUserOwner: board.getUuidOfUserOwner().getValue(),
        users: Array.from(board.getUsers(), ([uuid, role]) => ({
          uuid,
          role: role.getValue(),
        })),
        createdAt: new Date(),
        updatedAt: new Date(),
      });
      return BoardMongoMapper.toEntity(newBoard);
    }
    boardDoc.title = board.getTitle().getValue();
    boardDoc.description = board.getDescription()?.getValue();
    boardDoc.uuidOfUserOwner = board.getUuidOfUserOwner().getValue();
    boardDoc.users = Array.from(board.getUsers(), ([uuid, role]) => ({
      uuid,
      role: role.getValue(),
    }));
    boardDoc.updatedAt = new Date();

    await boardDoc.save();
    return BoardMongoMapper.toEntity(boardDoc);
  }

  async findByUUID(uuid: string) {
    const board = await this.boardModel.findOne({ uuid: uuid }).exec();

    if (!board) {
      return null;
    }

    return BoardMongoMapper.toEntity(board);
  }

  async findAll(limit: number = 100, offset: number = 0) {
    const listOfBoards = await this.boardModel
      .find()
      .skip(offset)
      .limit(limit)
      .exec();

    return listOfBoards.map(BoardMongoMapper.toEntity);
  }

  async update(updatedBoardDoc: BoardEntity) {
    const boardDoc = await this.boardModel
      .findOne({ uuid: updatedBoardDoc.getUUID().getValue() })
      .exec();

    if (!boardDoc) {
      throw new BoardNotFoundError("Board doesn't exist.");
    }

    boardDoc.title = updatedBoardDoc.getTitle().getValue();
    boardDoc.uuidOfUserOwner = updatedBoardDoc.getUuidOfUserOwner().getValue();
    boardDoc.description =
      updatedBoardDoc.getDescription()?.getValue() ?? undefined;

    const updatedBoard = await boardDoc.save();
    return BoardMongoMapper.toEntity(updatedBoard);
  }

  async delete(uuid: string) {
    const result = await this.boardModel.deleteOne({ uuid }).exec();

    return result.deletedCount > 0;
  }
}
