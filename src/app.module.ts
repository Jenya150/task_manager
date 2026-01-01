import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './user/user.module';
import * as process from 'node:process';
import * as dotenv from 'dotenv';

dotenv.config();

@Module({
  imports: [
    MongooseModule.forRoot(
      process.env.MONGODB_URI || 'mongodb://localhost:27017',
      {
        dbName: 'task-manager',
      },
    ),
    UserModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
