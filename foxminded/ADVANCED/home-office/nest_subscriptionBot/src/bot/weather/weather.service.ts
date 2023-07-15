import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import config from 'src/config/config';
import { IWeatherService } from '../interface/weather.data.interface';
import { from, Observable } from 'rxjs';
import { AxiosResponse } from 'axios';
import { LocationInterface } from 'src/interface/loc.interface';

@Injectable()
export class WeatherService implements IWeatherService {
  constructor(private httpService: HttpService) {}
  getWeather(location: LocationInterface): Observable<AxiosResponse<[]>> {
    return from(
      this.httpService.get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${
          location['latitude']
        }&lon=${location['longitude']}&appid=${
          config().weatherApi.key
        }&units=metric`,
      ),
    );
  }
}
