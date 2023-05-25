import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import * as bcrypt from 'bcrypt'
import { Repository } from 'typeorm'

import { RegisterUserDto } from './dto/regUser.dto'
import { User } from './user.entity'

@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private readonly userRepository: Repository<User>) {}

  public async createUser(userData: RegisterUserDto) {
    const salt = await bcrypt.genSalt(10)
    const hashPass = await bcrypt.hash(userData.password, salt)
    const newUser = this.userRepository.create({ ...userData, password: hashPass })
    return await this.userRepository.save(newUser)
  }

  public async getUserByEmail(email: string, includePassword = false) {
    const user = await this.userRepository.findOne({
      where: { email },
      relations: includePassword ? undefined : ['movies'],
      select: includePassword ? undefined : ['id', 'email', 'username'],
    })
    return user
  }
}
