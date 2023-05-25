import { LoginUserDto } from '@entities/users/dto/loginUser.dto'
import { RegisterUserDto } from '@entities/users/dto/regUser.dto'
import { User } from '@entities/users/user.entity'
import { UserService } from '@entities/users/user.service'
import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt/dist'
import * as bcrypt from 'bcrypt'

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService, private readonly jwtService: JwtService) {}

  async login(body: LoginUserDto) {
    const user = await this.validateUser(body)
    return await this.generateToken(user)
  }

  async registration(body: RegisterUserDto) {
    const candidate = await this.userService.getUserByEmail(body.email)
    if (candidate) {
      throw new ConflictException('User with this email already exists!')
    }
    const user = await this.userService.createUser(body)
    return this.generateToken(user)
  }

  private async generateToken(user: User) {
    const payload = { email: user.email, id: user.id }
    return {
      token: this.jwtService.sign(payload),
    }
  }

  private async validateUser(body: LoginUserDto) {
    const user = await this.userService.getUserByEmail(body.email, true)
    const passwordEquals = await bcrypt.compare(body.password, user.password)
    if (user && passwordEquals) {
      return user
    }
    throw new UnauthorizedException('Email is wrong, or password is wrong')
  }
}
