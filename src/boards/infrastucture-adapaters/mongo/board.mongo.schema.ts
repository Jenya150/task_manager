import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

interface IUsersInBoard {
  uuid: string;
  role: string;
}

@Schema({ collection: 'boards' })
export class BoardDocument {
  @Prop({ required: true, unique: true, index: true, type: String })
  readonly uuid: string;

  @Prop()
  title: string;

  @Prop({
    set: (v: string | null) => (v === null ? undefined : v),
    type: String,
  })
  description?: string;

  @Prop({
    required: true,
    type: String,
  })
  uuidOfUserOwner: string;

  @Prop({
    type: [
      {
        uuid: { required: true, type: String },
        role: { required: true, type: String, enum: ['OWNER', 'ADMIN', 'USER', 'VIEWER'] },
      }
    ],
  })
  users: IUsersInBoard[]

  @Prop()
  readonly createdAt: Date;

  @Prop()
  updatedAt: Date;
}

export const BoardMongoSchema = SchemaFactory.createForClass(BoardDocument);

// BoardMongoSchema.index(
//   { role: 1 },
//   { unique: true, partialFilterExpression: { role: { $exists: true } } },
// );