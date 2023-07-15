export interface IConvertTimeService {
  convertTime(time: string, location: object): Promise<string>;
}
