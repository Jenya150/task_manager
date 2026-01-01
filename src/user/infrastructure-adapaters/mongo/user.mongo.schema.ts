import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ collection: 'users' })
export class UserDocument {
  @Prop({ required: true, unique: true, index: true, type: String })
  readonly uuid: string;

  @Prop()
  username: string;

  @Prop({
    required: false,
    set: (v: string | null) => (v === null ? undefined : v),
    type: String,
  })
  email?: string;

  @Prop()
  activeProjectIds: string[];

  @Prop()
  ownerProjectIds: string[];

  @Prop()
  readonly createdAt: Date;

  @Prop()
  updatedAt: Date;
}

export const UserMongoSchema = SchemaFactory.createForClass(UserDocument);

UserMongoSchema.index(
  { email: 1 },
  { unique: true, partialFilterExpression: { email: { $exists: true } } },
);
