import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Post,
  Request,
  UnauthorizedException,
  ValidationPipe,
} from '@nestjs/common'

import { CreateUserDto } from '../users/interfaces/createUser.interface'

import { AuthService } from './auth.service'
import { Credentials } from './interfaces/credentials.interface'
import { UserToReturn } from './interfaces/userToReturn.interface'

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get()
  async auth(@Request() req): Promise<UserToReturn> {
    const token = req.headers.authorization?.slice(7)

    if (!token) throw new BadRequestException()

    try {
      return await this.authService.auth(token)
    } catch {
      throw new UnauthorizedException()
    }
  }

  @Post('/register')
  async register(
    @Body(ValidationPipe) user: CreateUserDto
  ): Promise<boolean | { access_token: string }> {
    return await this.authService.register(user)
  }

  @Post('/login')
  async login(
    @Body(ValidationPipe) credentails: Credentials
  ): Promise<{ access_token: string }> {
    return await this.authService.login(credentails)
  }
}
