import { BoardUUID } from '../value-objects/board-uuid.vo';
import { BoardTittle } from '../value-objects/board-title.vo';
import { BoardUserOwnerUuid } from '../value-objects/board-user-owner-uuid.vo';
import { BoardUsersRoles } from '../value-objects/board-users-roles.vo';
import { BoardDescription } from '../value-objects/board-description.vo';

import {
  OwnerAlreadyExistsError,
  OwnerCannotBeRemovedError,
  UserAlreadyAddedError,
  UserNotFoundError,
  UsersLimitReachedError,
} from '../errors';

export class BoardEntity {
  constructor(
    private readonly uuid: BoardUUID,
    private title: BoardTittle,
    private uuidOfUserOwner: BoardUserOwnerUuid,
    private users: Map<string, BoardUsersRoles>,
    private createdAt: Date,
    private updatedAt: Date,
    private description?: BoardDescription,
  ) {}

  static create(title: string, uuidOfUserOwner: string, description?: string): BoardEntity {
    const newBoardTittle = new BoardTittle(title);
    const newBoardOfUserOwnerUUID = new BoardUserOwnerUuid(uuidOfUserOwner)
    const newBoardDescription = new BoardDescription(description);

    const boardUsers = new Map<string, BoardUsersRoles>()
    boardUsers.set(uuidOfUserOwner, new BoardUsersRoles('OWNER'))

    const now = new Date();

    return new BoardEntity(
      new BoardUUID(),
      newBoardTittle,
      newBoardOfUserOwnerUUID,
      boardUsers,
      now,
      now,
      description ? newBoardDescription : undefined
    );
  }

  getUUID(): BoardUUID {
    return this.uuid;
  }

  getUuidOfUserOwner(): BoardUserOwnerUuid {
    return this.uuidOfUserOwner;
  }

  getTitle(): BoardTittle {
    return this.title;
  }

  getUsers(): Map<string, BoardUsersRoles> {
    return this.users;
  }

  getDescription(): BoardDescription | undefined {
    return this.description;
  }

  getCreatedAt(): Date {
    return this.createdAt;
  }

  getUpdatedAt(): Date {
    return this.updatedAt;
  }

  updateTitle(title: string): void {
    this.title = new BoardTittle(title);
    this.updatedAt = new Date();
  }

  updateUuidOwner(uuidOfOwner: string): void {
    this.uuidOfUserOwner = new BoardUserOwnerUuid(uuidOfOwner);
    this.updatedAt = new Date();
  }

  updateDescription(description: string | null): void {
    if (!description) {
      this.description = undefined;
      this.updatedAt = new Date();
      return;
    }

    this.description = new BoardDescription(description);
    this.updatedAt = new Date();
  }

  addUserToBoard(idOfUser: string, role?: string): void {
    const roleOfUser = role ? new BoardUsersRoles(role) : new BoardUsersRoles('USER')

    if (this.users.get(idOfUser)) {
      throw new UserAlreadyAddedError('This user is already added.');
    }

    if (this.getUsers().size >= 10) {
      throw new UsersLimitReachedError('Users limit is reached');
    }

    if (role == 'OWNER') {
      throw new OwnerAlreadyExistsError('Owner is already exists.');
    }

    this.users.set(idOfUser, roleOfUser)
  }

  changeUserRoleInBoard(idOfUser: string, role: string): void {
    const roleOfUser = new BoardUsersRoles(role)
    const user = this.users.get(idOfUser);
    if (!user) {
      throw new UserNotFoundError('User not founded.');
    }

    if (role == 'OWNER') {
      throw new OwnerAlreadyExistsError('Owner is already exists.');
    }

    this.users.set(idOfUser, roleOfUser)
  }

  removeUserFromBoard(idOfUser: string): void {
    const user = this.users.get(idOfUser);
    if (!user) {
      throw new UserNotFoundError('User not founded.');
    }

    if (this.getUsers().get(idOfUser)?.equals(new BoardUsersRoles('OWNER'))) {
      throw new OwnerCannotBeRemovedError('Owner cannot be removed.');
    }

    this.users.delete(idOfUser);

  }

  getAccountAge(): number {
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - this.createdAt.getTime());
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  }
}