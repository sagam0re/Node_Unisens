import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schema/user.schema';
import { SubscriberData } from '../interface/subscribers.interface';
import { IUserRepository } from './interface/user.repo.interface';
import { UserEntity } from './entity/user-entity';

@Injectable()
export class UserRepository implements IUserRepository {
  constructor(@InjectModel(User.name) private userModel: Model<UserEntity>) {}
  async findAllSubscribes(time: string) {
    return await this.userModel.find({ time });
  }

  async addSubscriber(subscriberData: SubscriberData) {
    return this.userModel.updateOne({ id: subscriberData.id }, subscriberData, {
      upsert: true,
    });
  }

  async findUserById(id: number) {
    const user = await this.userModel.findOne({ id });
    return user;
  }
}
