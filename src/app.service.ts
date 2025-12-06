import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  async sentHi() {
    return 'Hello from "task manager"!'
  }
}
