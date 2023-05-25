import { JwtAuthGuard } from '@entities/auth/jwtAuth.guard'
import { Controller, Get, Req, UseGuards } from '@nestjs/common'
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
import { User } from './user.entity'
import { UserService } from './user.service'

import { Request } from 'express'

@ApiTags('Users')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOperation({ summary: 'Get current' })
  @ApiResponse({ status: 200, type: [User] })
  @UseGuards(JwtAuthGuard)
  @Get('/current')
  async current(@Req() req: Request & { user: any }) {
    const { email } = req.user
    return await this.userService.getUserByEmail(email)
  }
}
