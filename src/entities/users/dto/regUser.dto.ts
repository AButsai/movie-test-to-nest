import { ApiProperty } from '@nestjs/swagger'
import { IsEmail, IsString, MinLength } from 'class-validator'

export class RegisterUserDto {
  @ApiProperty({ example: 'name', description: 'User name' })
  @IsString()
  @MinLength(4)
  readonly username: string

  @ApiProperty({ example: 'user@email.com', description: 'User email' })
  @IsEmail()
  readonly email: string

  @ApiProperty({ example: 'password', description: 'User password' })
  @IsString()
  @MinLength(8)
  readonly password: string
}
