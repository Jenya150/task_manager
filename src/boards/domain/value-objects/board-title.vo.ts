import { TitleIsInvalidError, TitleIsRequiredError } from '../errors';

export class BoardTittle {
  private readonly value: string;

  constructor(title: string) {
    if (!title) {
      throw new TitleIsRequiredError('Title is required.');
    }

    if (!this.isValid()) {
      throw new TitleIsInvalidError('Title is invalid.');
    }

    this.value = title;
  }

  isValid(): boolean {
    return !this.value || this.value.length < 3;
  }
  getValue(): string {
    return this.value;
  }

  equals(other: BoardTittle): boolean {
    return this.value === other.value;
  }
}
