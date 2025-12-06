import { AppService } from './app.service';
import { Ctx, Start, Update } from 'nestjs-telegraf';
import { Context } from 'telegraf';

@Update()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Start()
  async hears(@Ctx() ctx: Context) {
    const mes = await this.appService.sentHi()
    await ctx.reply(mes)
  }
}
