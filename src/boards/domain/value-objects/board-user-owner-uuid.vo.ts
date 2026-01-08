import { isUUID } from 'class-validator';
import {
  OwnerUserUUIDIsInvalidError,
  OwnerUserUUIDIsRequiredError,
} from '../errors';

export class BoardUserOwnerUuid {
  private readonly value: string;

  constructor(id: string) {
    if (!id) {
      throw new OwnerUserUUIDIsRequiredError('Owner user uuid is required.');
    }

    this.value = id;

    if (!this.isValid()) {
      throw new OwnerUserUUIDIsInvalidError('Owner user uuid is invalid.');
    }

    this.value = id;
  }

  isValid(): boolean {
    return isUUID(this.value);
  }

  getValue(): string {
    return this.value;
  }

  equals(other: BoardUserOwnerUuid): boolean {
    return this.value === other.value;
  }
}
