import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop({ type: Number })
  id: number;

  @Prop({ type: String })
  time: string;

  @Prop({ type: Object })
  location: object;
}

export const UserSchema = SchemaFactory.createForClass(User);
