import { Context } from 'telegraf';

export interface IBotUpdate {
  onStart(ctx: Context): object;
  onHelp(ctx: Context): object;
  hearsDescribe(ctx: Context): object;
  hearsSubscribe(ctx: Context): object;
  onLocation(ctx: Context): object;
  onTime(ctx: Context): object;
}
