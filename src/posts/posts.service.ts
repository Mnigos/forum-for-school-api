import { BadRequestException, HttpException, Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'

import { CreatePost } from './interfaces/createPost.interface'
import { Post } from './interfaces/post.interface'
import { PostDoc } from './interfaces/postDoc.interface'

@Injectable()
export class PostsService {
  constructor(
    @InjectModel('Posts') private readonly postsModel: Model<PostDoc>
  ) {}

  async getTitles(): Promise<Omit<Post, 'content'>[]> {
    return await this.postsModel.find().select('_id title createdAt')
  }

  async getOneById(_id: string): Promise<Post> {
    if (!_id) throw new BadRequestException('Cannot find post with specify id')

    try {
      return await this.postsModel.findOne({ _id }).exec()
    } catch (error) {
      throw new HttpException(error.message, 500)
    }
  }

  async create(post: CreatePost): Promise<boolean> {
    try {
      await this.postsModel.create(post)

      return true
    } catch (error) {
      throw new HttpException(error.message, 500)
    }
  }

  async update(post: Post): Promise<Post> {
    const { _id } = post

    if (!_id) throw new BadRequestException('Cannot find post with specify id')

    try {
      await this.postsModel.updateOne({ _id }, post)

      return post
    } catch (error) {
      throw new HttpException(error.message, 500)
    }
  }

  async delete(_id: string): Promise<boolean> {
    if (!_id) throw new BadRequestException('Cannot find post with specify id')

    try {
      await this.postsModel.remove({ _id })

      return true
    } catch (error) {
      throw new HttpException(error.message, 500)
    }
  }
}
