import { randomUUID } from 'crypto';

export class BoardUUID {
  private readonly value: string;

  constructor(id?: string) {
    this.value = id || randomUUID();
  }

  getValue(): string {
    return this.value;
  }

  equals(other: BoardUUID): boolean {
    return this.value === other.value;
  }
}
