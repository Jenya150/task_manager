import { UserUUID } from '../value-objects/user-uuid.vo';
import { UserEmail } from '../value-objects/user-email.vo';
import { UserUsername } from '../value-objects/user-username.vo';

import {
  ActiveProjectsLimitError,
  InvalidProjectIdError,
  ProjectAlreadyActiveError,
} from '../errors';

export class UserEntity {
  constructor(
    private readonly uuid: UserUUID,
    private username: UserUsername,
    private activeProjectIds: string[],
    private ownerProjectIds: string[],
    private readonly createdAt: Date,
    private updatedAt: Date,
    private email?: UserEmail,
  ) {}

  static create(username: string, email?: string): UserEntity {
    const newUsername = new UserUsername(username);
    email ? new UserEmail(email) : undefined

    return new UserEntity(
      new UserUUID(),
      newUsername,
      [],
      [],
      new Date(),
      new Date(),
      email ? new UserEmail(email): undefined,
    );
  }

  getUUID(): UserUUID {
    return this.uuid;
  }

  getUsername(): UserUsername {
    return this.username;
  }

  getEmail(): UserEmail | undefined {
    return this.email;
  }

  getActiveProjects(): string[] {
    return this.activeProjectIds;
  }

  getOwnerProjectIds(): string[] {
    return this.ownerProjectIds;
  }

  getCreatedAt(): Date {
    return this.createdAt;
  }

  getUpdatedAt(): Date {
    return this.updatedAt;
  }

  updateUsername(username: string): void {
    this.username = new UserUsername(username);
    this.updatedAt = new Date();
  }

  updateEmail(email: string | null): void {
    if (!email) {
      this.email = undefined;
      this.updatedAt = new Date();
      return;
    }

    this.email = new UserEmail(email);
    this.updatedAt = new Date();
  }

  addActiveProject(newProjectId: string, maxActiveProjects: number): void {
    if (!newProjectId) {
      throw new InvalidProjectIdError();
    }

    if (this.activeProjectIds.includes(newProjectId)) {
      throw new ProjectAlreadyActiveError();
    }

    if (this.activeProjectIds.length >= maxActiveProjects) {
      throw new ActiveProjectsLimitError(String(maxActiveProjects));
    }

    this.activeProjectIds.push(newProjectId);
    this.updatedAt = new Date();
  }

  getAccountAge(): number {
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - this.createdAt.getTime());
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  }
}
