import { RoleIsInvalidError } from '../errors';

export class BoardUsersRoles {
  private readonly value: string;

  constructor(role: string) {
    this.value = role;
    if(!this.isValid()) {
      throw new RoleIsInvalidError('Invalid role');
    }
  }

  isValid(): boolean {
    return this.value === 'OWNER' || this.value === 'ADMIN' || this.value === 'USER' || this.value === 'VIEWER';
  }

  getValue(): string {
    return this.value;
  }

  equals(other: BoardUsersRoles): boolean {
    return this.value === other.value;
  }
}