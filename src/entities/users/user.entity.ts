import { Movies } from '@entities/movies/movies.entity'
import { BadRequestException } from '@nestjs/common'
import { ApiProperty } from '@nestjs/swagger'
import { BaseEntity, BeforeInsert, Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm'

@Entity({ name: 'users' })
export class User extends BaseEntity {
  @ApiProperty({ example: '1eebb2d5-dbbb-41ce-9225-2e350a07400d', description: 'Unique id user`s' })
  @PrimaryGeneratedColumn('uuid')
  id: string

  @ApiProperty({ example: 'password', description: 'User password' })
  @Column({ name: 'password', type: 'varchar', length: 255 })
  password: string

  @ApiProperty({ example: 'name', description: 'User name' })
  @Column({ name: 'user_name', type: 'varchar' })
  username: string

  @ApiProperty({ example: 'user@email.com', description: 'User email' })
  @Column({ unique: true, name: 'email', type: 'varchar' })
  email: string

  @BeforeInsert()
  validateEmail() {
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.email)) {
      throw new BadRequestException('Not valid email')
    }
  }

  @OneToMany(() => Movies, (movies) => movies.user)
  movies: Movies[]
}
