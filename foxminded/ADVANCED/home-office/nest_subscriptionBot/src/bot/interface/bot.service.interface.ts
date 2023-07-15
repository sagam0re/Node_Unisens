import { UserEntity } from 'src/database/entity/user-entity';
import { SubscriberData } from '../../interface/subscribers.interface';

export interface IBotService {
  addTimeOnUser(subscriberData: SubscriberData): Promise<object>;
  addSubscriberOnLocation(subscriberData: SubscriberData): Promise<object>;
  findUserByTime(time: string): Promise<UserEntity[]>;
}
