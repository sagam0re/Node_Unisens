import { SubscriberData } from '../../interface/subscribers.interface';
import { UserEntity } from '../entity/user-entity';

export interface IUserRepository {
  findAllSubscribes(time: string): Promise<UserEntity[]>;
  findUserById(id: number): Promise<UserEntity>;
  addSubscriber(subscriberData: SubscriberData): Promise<object>;
}
