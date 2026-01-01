import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://admin:naqmiw532UEerKpn@cluster0.mtdmxex.mongodb.net/myapp?retryWrites=true&w=majority',
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
