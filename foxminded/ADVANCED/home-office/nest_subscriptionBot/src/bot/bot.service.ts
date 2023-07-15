import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { UserRepository } from 'src/database/user.repository';
import { SubscriberData } from '../interface/subscribers.interface';
import { IUserRepository } from '../database/interface/user.repo.interface';
import { IBotService } from './interface/bot.service.interface';
import { IConvertTimeService } from './interface/tz.interface';
import { ConvertTimeService } from './timezone/timezone.service';

@Injectable()
export class BotService implements IBotService {
  constructor(
    @Inject(UserRepository) private readonly userRepository: IUserRepository,
    @Inject(ConvertTimeService) private readonly tz: IConvertTimeService,
  ) {}

  async addSubscriberOnLocation(subscriberData: SubscriberData) {
    const location = await this.userRepository.findUserById(subscriberData.id);
    return this.userRepository.addSubscriber({ location, ...subscriberData });
  }

  async addTimeOnUser(subscriberData: SubscriberData) {
    const user = await this.userRepository.findUserById(subscriberData.id);
    if (!user) {
      throw new HttpException(
        'Please send me Location first',
        HttpStatus.BAD_REQUEST,
      );
    }
    const location = user['location'];
    const utcTime = await this.tz.convertTime(subscriberData.time, location);

    return this.userRepository.addSubscriber({
      location,
      time: utcTime,
      id: subscriberData.id,
    });
  }

  async findUserByTime(time: string) {
    const user = await this.userRepository.findAllSubscribes(time);

    return user;
  }
}
