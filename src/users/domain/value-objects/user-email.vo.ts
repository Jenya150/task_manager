import * as EmailValidator from 'email-validator';
import { EmailIsInvalidError } from '../errors';

export class UserEmail {
  private readonly value: string | undefined;

  constructor(email: string | null) {
    if (email) {
      this.value = email;

      if (!this?.isValid()) {
        this.value = undefined;
        throw new EmailIsInvalidError('Email is invalid.');
      }
    } else {
      this.value = undefined;
    }
  }

  isValid(): boolean {
    if (!this.value) {
      return true;
    }

    return EmailValidator.validate(this.value);
  }

  getValue(): string | undefined {
    return this.value;
  }

  equals(other: UserEmail) {
    return this.value === other.value;
  }
}
