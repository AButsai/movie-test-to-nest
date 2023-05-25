import { User } from '@entities/users/user.entity'
import { BadRequestException } from '@nestjs/common'
import { ApiProperty } from '@nestjs/swagger'
import * as moment from 'moment'
import {
  BaseEntity,
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm'

@Entity({ name: 'movies' })
export class Movies extends BaseEntity {
  @ApiProperty({ example: '1eebb2d5-dbbb-41ce-9225-2e350a07400d', description: 'Unique id user`s' })
  @PrimaryGeneratedColumn('uuid')
  id: string

  @ApiProperty({ example: 'Men in Black International', description: 'Movie title' })
  @Column({ name: 'title', type: 'varchar' })
  title: string

  @ApiProperty({ example: 'Steven Allan Spielberg', description: 'Movie director' })
  @Column({ name: 'director', type: 'varchar' })
  director: string

  @ApiProperty({ example: '11-06-2019', description: 'Movie release date' })
  @Column({ name: 'release_date', type: 'varchar' })
  releaseDate: string

  @ApiProperty({ example: '1eebb2d5-dbbb-41ce-9225-2e350a07400d', description: 'User Id' })
  @Column({ name: 'user_id', type: 'varchar' })
  userId: string

  @BeforeInsert()
  @BeforeUpdate()
  validateReleaseDate() {
    const currentDate = new Date()
    const releaseDate = moment(this.releaseDate, 'DD-MM-YYYY', true)
    if (releaseDate.isValid() && !releaseDate.isSameOrBefore(currentDate)) {
      throw new BadRequestException('Release date cannot be in the future')
    }
  }

  @ManyToOne(() => User, (user) => user.movies)
  @JoinColumn({ name: 'user' })
  user: User
}
