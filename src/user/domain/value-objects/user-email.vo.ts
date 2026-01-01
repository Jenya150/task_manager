import * as EmailValidator from 'email-validator';

export class UserEmail {
  private readonly value: string | undefined;

  constructor(email: string | null) {
    if (email == null) {
      this.value = undefined;
    } else {
      if (!this.isValid(email)) {
        throw new Error('Invalid email format');
      }
      this.value = email;
    }
  }

  private isValid(email: string): boolean {
    return EmailValidator.validate(email);
  }

  getValue(): string | undefined {
    return this.value;
  }

  equals(other: UserEmail) {
    return this.value === other.value;
  }
}
