import { UserModule } from '@entities/users/user.module'
import { Module, forwardRef } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'
import { AuthController } from './auth.controller'
import { AuthService } from './auth.service'

@Module({
  controllers: [AuthController],
  providers: [AuthService],
  imports: [
    forwardRef(() => UserModule),
    JwtModule.register({
      secret: process.env.ACCESS_TOKEN_PRIVATE_KEY || 'SECRET',
      signOptions: {
        expiresIn: '24h',
      },
    }),
  ],
  exports: [AuthService, JwtModule],
})
export class AuthModule {}
