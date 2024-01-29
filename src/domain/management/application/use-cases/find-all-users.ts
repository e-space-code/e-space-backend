import { UsersRepository } from '../repositories/users.repository'
import { User } from '../../enterprise/entities/user'
import { Either, right } from '@/core/either'
import { Injectable } from '@nestjs/common'

export type FindAllUsersResponse = Either<
  null,
  {
    users: User[]
  }
>

@Injectable()
export class FindAllUsers {
  constructor(private readonly usersRepository: UsersRepository) {}

  async execute(): Promise<FindAllUsersResponse> {
    const users = await this.usersRepository.findAll()

    return right({ users })
  }
}
