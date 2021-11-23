import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document } from 'mongoose'

@Schema()
export class PostApi extends Document {
  @Prop({ type: String, required: true })
  title: string

  @Prop({ type: String, required: true })
  content: string

  @Prop({ type: String, default: () => new Date() })
  createdAt: Date
}

export const PostSchema = SchemaFactory.createForClass(PostApi)
