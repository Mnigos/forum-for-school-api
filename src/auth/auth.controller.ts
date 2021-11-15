import { Body, Controller, Post, ValidationPipe } from '@nestjs/common'

import { CreateUserDto } from '../users/interfaces/createUser.interface'

import { AuthService } from './auth.service'
import { Credentials } from './interfaces/credentials.interface'

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

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
