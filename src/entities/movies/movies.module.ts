import { AuthModule } from '@entities/auth/auth.module'
import { UserModule } from '@entities/users/user.module'
import { Module, forwardRef } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { MoviesController } from './movies.controller'
import { Movies } from './movies.entity'
import { MoviesService } from './movies.service'

@Module({
  imports: [TypeOrmModule.forFeature([Movies]), forwardRef(() => AuthModule), UserModule],
  controllers: [MoviesController],
  providers: [MoviesService],
  exports: [MoviesService],
})
export class MoviesModule {}
