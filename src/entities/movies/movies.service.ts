import { UserService } from '@entities/users/user.service'
import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { MoviesDto } from './dto/movies.dto'
import { Movies } from './movies.entity'

@Injectable()
export class MoviesService {
  constructor(
    @InjectRepository(Movies) private readonly movieRepository: Repository<Movies>,
    private readonly userService: UserService,
  ) {}

  private async getUserByEmail(email: string) {
    const user = await this.userService.getUserByEmail(email)
    if (user) {
      return user
    }
    throw new HttpException('Not Found', HttpStatus.NOT_FOUND)
  }

  async create(email: string, body: MoviesDto) {
    const user = await this.getUserByEmail(email)
    const movie = this.movieRepository.create({ ...body, user, userId: user.id })
    return await this.movieRepository.save(movie)
  }

  async update(id: string, body: MoviesDto) {
    await this.movieRepository.update(id, body)
    return this.movieRepository.findOne({ where: { id } })
  }

  async getAllMovies(email: string, page: number, limit: number) {
    if (page < 1) {
      page = 1
    }
    const skip = (page - 1) * limit
    const user = await this.getUserByEmail(email)
    return await this.movieRepository.find({ where: { userId: user.id }, skip, take: limit })
  }

  async getMovieById(id: string) {
    return await this.movieRepository.findOne({ where: { id } })
  }

  async deleteMovieById(id: string) {
    return await this.movieRepository.delete(id)
  }
}
