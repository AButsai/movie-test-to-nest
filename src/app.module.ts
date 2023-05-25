import { TypeOrmModule } from '@db/typeorm.module'
import { UserModule } from '@entities/users/user.module'
import { Module } from '@nestjs/common'
import { ConfigModule } from './config.module'
import { AuthModule } from './entities/auth/auth.module';
import { MoviesModule } from './entities/movies/movies.module';

@Module({
  imports: [ConfigModule, TypeOrmModule, UserModule, AuthModule, MoviesModule],
})
export class AppModule {}
