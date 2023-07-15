import { Update, Start, Help, On, Hears } from 'nestjs-telegraf';
import {
  buttons,
  randomMsgArr,
  receivedMsg,
  sendMsg,
} from '../constant/constants';
import { Context } from 'telegraf';
import { IBotUpdate } from './interface/bot.update.interface';
import { IBotService } from './interface/bot.service.interface';
import { Inject } from '@nestjs/common';
import { BotService } from './bot.service';

@Update()
export class BotUpdate implements IBotUpdate {
  constructor(@Inject(BotService) private readonly botService: IBotService) {}
  @Start()
  async onStart(ctx: Context) {
    await ctx.reply(sendMsg.onStartMsg, {
      reply_markup: {
        keyboard: [[buttons.help, buttons.description, buttons.subscribe]],
        resize_keyboard: true,
        one_time_keyboard: true,
      },
    });
  }

  @Help()
  async onHelp(ctx: Context) {
    await ctx.reply(sendMsg.onHelpMsg, {
      reply_markup: {
        keyboard: [[buttons.start, buttons.description, buttons.subscribe]],
        one_time_keyboard: true,
        resize_keyboard: true,
      },
    });
  }

  @Hears(receivedMsg.description)
  async hearsDescribe(ctx: Context) {
    await ctx.reply(sendMsg.onDescribeMsg, {
      reply_markup: {
        keyboard: [[buttons.start, buttons.help, buttons.subscribe]],
        resize_keyboard: true,
        one_time_keyboard: true,
      },
    });
  }

  @Hears(receivedMsg.subscribe)
  async hearsSubscribe(ctx: Context) {
    await ctx.reply(sendMsg.onSubscribeMsg, {
      reply_markup: {
        keyboard: [[{ text: buttons.location, request_location: true }]],
        resize_keyboard: true,
        one_time_keyboard: true,
      },
    });
  }

  @On('location')
  async onLocation(ctx: Context) {
    const { location } = ctx.update['message'];
    const { id } = ctx.update['message'].from;
    this.botService.addSubscriberOnLocation({ id, location });
    await ctx.reply(sendMsg.onLocationMsg);
  }

  @Hears(receivedMsg.regExp)
  async onTime(ctx: Context) {
    try {
      const { id } = ctx.update['message'].from;
      const time = ctx.update['message'].text;
      await this.botService.addTimeOnUser({ id, time });
      await ctx.reply(sendMsg.onTimeMsg);
    } catch (err) {
      await ctx.reply(err.message);
    }
  }

  @On('message')
  async onRAndomMsg(ctx: Context) {
    const index = Math.floor(Math.random() * randomMsgArr.length);
    await ctx.reply(`${randomMsgArr[index]}`, { parse_mode: 'HTML' });
  }
}
