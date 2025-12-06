import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TelegrafModule } from 'nestjs-telegraf';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    TelegrafModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: function async (configService: ConfigService){
        const token = configService.get<string>('TELEGRAM_TOKEN');
        if(!token) {
          throw Error ('TELEGRAM_TOKEN variable is invalidated.')
        }
        return {
          token: token,
        };
      },
      inject: [ConfigService],
    })
  ],
  providers: [AppController, AppService],
})
export class AppModule {}
