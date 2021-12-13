import * as dotenv from 'dotenv'
dotenv.config()
import { NestFactory } from '@nestjs/core'
import { InternalServerErrorException } from '@nestjs/common'

import { AppModule } from './app.module'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  app.enableCors()

  try {
    await app.listen(process.env.PORT || 3000)
  } catch {
    throw new InternalServerErrorException()
  }
}
bootstrap()
