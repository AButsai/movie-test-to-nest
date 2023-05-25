import { LoginUserDto } from '@entities/users/dto/loginUser.dto'
import { RegisterUserDto } from '@entities/users/dto/regUser.dto'
import { Body, Controller, Post } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { AuthService } from './auth.service'

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @Post('/login')
  async login(@Body() body: LoginUserDto) {
    return this.authService.login(body)
  }

  @Post('/registration')
  async registration(@Body() body: RegisterUserDto) {
    return this.authService.registration(body)
  }
}
