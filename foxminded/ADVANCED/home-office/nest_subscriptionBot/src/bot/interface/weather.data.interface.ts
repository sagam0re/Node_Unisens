import { AxiosResponse } from 'axios';
import { Observable } from 'rxjs';
import { LocationInterface } from 'src/interface/loc.interface';

export interface IWeatherService {
  getWeather(location: LocationInterface): Observable<AxiosResponse<[]>>;
}
