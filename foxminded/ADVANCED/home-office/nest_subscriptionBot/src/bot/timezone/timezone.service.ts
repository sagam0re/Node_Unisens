import { find } from 'geo-tz';
import * as moment from 'moment-timezone';
import { IConvertTimeService } from '../interface/tz.interface';

export class ConvertTimeService implements IConvertTimeService {
  async convertTime(time: string, location: object) {
    const localTimeZone = find(location['latitude'], location['longitude']);
    return moment.tz(time, 'HH:mm', localTimeZone[0]).utc().format('HH:mm');
  }
}
