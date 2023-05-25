import { ApiProperty } from '@nestjs/swagger'
import { IsString } from 'class-validator'

export class MoviesDto {
  @ApiProperty({ example: 'Men in Black International', description: 'Movie title' })
  @IsString()
  title: string

  @ApiProperty({ example: 'Steven Allan Spielberg', description: 'Movie director' })
  @IsString()
  director: string

  @ApiProperty({ example: '11-06-2019', description: 'Movie release date' })
  @IsString()
  releaseDate: string
}
