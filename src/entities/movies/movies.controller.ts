import { JwtAuthGuard } from '@entities/auth/jwtAuth.guard'
import {
  Body,
  Controller,
  DefaultValuePipe,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common'
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
import { Request } from 'express'
import { MoviesDto } from './dto/movies.dto'
import { Movies } from './movies.entity'
import { MoviesService } from './movies.service'

@ApiTags('Movies')
@Controller('movies')
export class MoviesController {
  constructor(private movieService: MoviesService) {}

  @ApiOperation({ summary: 'Create new movie' })
  @ApiResponse({ status: 200, type: MoviesDto })
  @UseGuards(JwtAuthGuard)
  @Post()
  async addMovie(@Body() body: MoviesDto, @Req() req: Request & { user: any }) {
    const { email } = req.user
    return await this.movieService.create(email, body)
  }

  @ApiOperation({ summary: 'Update movie' })
  @ApiResponse({ status: 200, type: MoviesDto })
  @UseGuards(JwtAuthGuard)
  @Patch('/:id')
  async updateMovie(@Param('id') id: string, @Body() body: MoviesDto) {
    return await this.movieService.update(id, body)
  }

  @ApiOperation({ summary: 'Get all movies' })
  @ApiResponse({ status: 200, type: [Movies] })
  @UseGuards(JwtAuthGuard)
  @Get()
  async getAll(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('limit', new DefaultValuePipe(20), ParseIntPipe) limit: number,
    @Req() req: Request & { user: any },
  ) {
    const { email } = req.user
    return await this.movieService.getAllMovies(email, page, limit)
  }

  @ApiOperation({ summary: 'Get movie by id' })
  @ApiResponse({ status: 200, type: Movies })
  @UseGuards(JwtAuthGuard)
  @Get('/:id')
  async getMovieById(@Param('id') id: string) {
    return await this.movieService.getMovieById(id)
  }

  @ApiOperation({ summary: 'Delete movie by id' })
  @ApiResponse({ status: 200 })
  @UseGuards(JwtAuthGuard)
  @Delete('/:id')
  async deleteMovieById(@Param('id') id: string) {
    return await this.movieService.deleteMovieById(id)
  }
}
