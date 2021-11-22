import { IsString, MinLength, MaxLength } from 'class-validator'

export class CreateUserDto {
  @IsString()
  @MinLength(4)
  @MaxLength(20)
  name: string

  @IsString()
  @MinLength(8)
  @MaxLength(20)
  pass: string
}
