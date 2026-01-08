import { UsernameIsInvalidError, UsernameIsRequiredError } from '../errors';

export class UserUsername {
  private readonly value: string;

  constructor(username: string) {
    this.value = username;
    if (!username) {
      throw new UsernameIsRequiredError('Username is required.');
    }

    if (!this.isValid()) {
      throw new UsernameIsInvalidError('Username is invalid.');
    }
  }

  isValid(): boolean {
    if (!this.value) {
      return false;
    }
    return !(this.value.length < 3);
  }
  getValue(): string {
    return this.value;
  }

  equals(other: UserUsername): boolean {
    return this.value === other.value;
  }
}
