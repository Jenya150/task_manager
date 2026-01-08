import { DescriptionIsInvalidError } from '../errors';

export class BoardDescription {
  private readonly value: string | undefined;

  constructor(description: string | undefined) {
    if (description) {
      if (!this.isValid()) {
        throw new DescriptionIsInvalidError(
          'Description is invalid or too long',
        );
      }

      this.value = description;
    } else {
      this.value = undefined;
    }
  }

  isValid(): boolean {
    if (!this.value) {
      return true;
    }

    return this.value.length <= 100 && this.value.length > 0;
  }

  getValue(): string | undefined {
    return this.value;
  }

  equals(other: BoardDescription): boolean {
    return this.value === other.value;
  }
}
