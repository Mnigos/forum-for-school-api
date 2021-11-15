import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common'
import * as bcrypt from 'bcrypt'
import { JwtService } from '@nestjs/jwt'

import { UsersService } from '../users/users.service'
import { CreateUserDto } from '../users/interfaces/createUser.interface'

import { Credentials } from './interfaces/credentials.interface'
import { UserToReturn } from './interfaces/userToReturn.interface'

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService
  ) {}

  async validateUser(
    username: string,
    password: string
  ): Promise<UserToReturn> {
    const foundedUser = await this.usersService.getOneByName(username)

    if (!foundedUser || (await !bcrypt.compare(foundedUser.pass, password)))
      return null

    const { _id, email, createdAt } = foundedUser

    return {
      _id,
      name: username,
      email,
      createdAt,
    }
  }

  async register(
    user: CreateUserDto
  ): Promise<boolean | { access_token: string }> {
    const registeredStatus = await this.usersService.create(user)

    if (!registeredStatus) return registeredStatus

    return await this.login({
      nameOrEmail: user.name,
      pass: user.pass,
    } as Credentials)
  }

  async login(credentials: Credentials): Promise<{ access_token: string }> {
    const { nameOrEmail, pass } = credentials
    let sub: string

    if (!nameOrEmail)
      throw new BadRequestException('Name or Email field cannot be empty')
    if (!pass) throw new BadRequestException('Password field cannot be empty')

    const emailRegex = /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/

    if (nameOrEmail.match(emailRegex)) sub = 'email'
    sub = 'name'

    const foundedUser =
      sub === 'name'
        ? await this.usersService.getOneByName(nameOrEmail)
        : await this.usersService.getOneByEmail(nameOrEmail)

    if (!foundedUser || !(await bcrypt.compare(pass, foundedUser.pass)))
      throw new UnauthorizedException()

    return {
      access_token: this.jwtService.sign({ name: nameOrEmail, sub }),
    }
  }
}
