export class UserUsername {
  private readonly value: string;

  constructor(username: string) {
    this.value = username;
  }

  isValid(): boolean {
    return !(!this.value || this.value.length < 3);
  }
  getValue(): string {
    return this.value;
  }

  equals(other: UserUsername): boolean {
    return this.value === other.value;
  }
}
