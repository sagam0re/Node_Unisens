import { Inject, Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import * as moment from 'moment-timezone';
import { BotService } from '../bot/bot.service';
import { IBotService } from '../bot/interface/bot.service.interface';
import { IWeatherService } from '../bot/interface/weather.data.interface';
import { WeatherService } from 'src/bot/weather/weather.service';
import { Telegram } from 'telegraf';
import { ICronService } from './cron.interface';

@Injectable()
export class CronService implements ICronService {
  private readonly bot: Telegram = new Telegram(process.env.TOKEN);
  constructor(
    @Inject(BotService) private readonly botService: IBotService,
    @Inject(WeatherService) private readonly weatherService: IWeatherService,
  ) {}
  @Cron(' * * * * *')
  async cron() {
    const date = new Date();
    const convertedTime = moment(date, 'HH:mm').utc().format('HH:mm');
    const users = await this.botService.findUserByTime(convertedTime);

    return users.map((elem) =>
      this.weatherService
        .getWeather({
          latitude: elem['location']['latitude'],
          longitude: elem['location']['longitude'],
        })
        .subscribe({
          next: ({ data }) =>
            this.bot.sendMessage(
              users[0].id,
              `Hi, weather on your location is ${Math.round(
                data['main']['temp'],
              )} C\xB0`,
            ),
        }),
    );
  }
}
