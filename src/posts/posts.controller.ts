import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common'

import { JwtAuthGuard } from '../auth/jwtAuth.guard'

import { CreatePost } from './interfaces/createPost.interface'
import { Post as IPost } from './interfaces/post.interface'
import { PostsService } from './posts.service'

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @UseGuards(JwtAuthGuard)
  @Get('/')
  async getTitles() {
    return await this.postsService.getTitles()
  }

  @UseGuards(JwtAuthGuard)
  @Get('/:id')
  async getOneById(@Param('id') id: string) {
    return await this.postsService.getOneById(id)
  }

  @UseGuards(JwtAuthGuard)
  @Post('/')
  async create(@Body() post: CreatePost) {
    return await this.postsService.create(post)
  }

  @UseGuards(JwtAuthGuard)
  @Put('/')
  async update(@Body() post: IPost) {
    return await this.postsService.update(post)
  }

  @UseGuards(JwtAuthGuard)
  @Delete('/:id')
  async delete(@Param('id') id: string) {
    return await this.postsService.delete(id)
  }
}
