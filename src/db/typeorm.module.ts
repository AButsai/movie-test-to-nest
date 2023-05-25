import { Module } from '@nestjs/common'
import { ConfigModule as NestConfigModule } from '@nestjs/config'
import { TypeOrmModule as NestTypeOrmModule } from '@nestjs/typeorm'

@Module({
  imports: [
    NestConfigModule.forRoot({
      envFilePath: `.${process.env.NODE_ENV}.env`,
    }),
    NestTypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: Number(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      entities: ['dist/entities/**/*.entity.js'],
      synchronize: true,
      // migrations: ['dist/db/migrations/**/*.js'],
      // cli: [migrationsDir: 'src/db/migrations']
    }),
  ],
})
export class TypeOrmModule {}
