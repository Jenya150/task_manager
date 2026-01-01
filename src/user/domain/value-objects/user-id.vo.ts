import { randomUUID } from 'crypto';

export class UserUUID {
  private readonly value: string;

  constructor(id?: string) {
    this.value = id || randomUUID();
  }

  getValue(): string {
    return this.value;
  }

  equals(other: UserUUID): boolean {
    return this.value === other.value;
  }
}
