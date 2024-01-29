import { Either, left, right } from '@/core/either'
import { User } from '../../enterprise/entities/user'
import { UsersRepository } from '../repositories/users.repository'
import { UserNotFoundError } from './errors/user-not-found.error'
import { Injectable } from '@nestjs/common'

export type FindUserByIdRequest = {
  id: string
}

export type FindUserByIdResponse = Either<
  UserNotFoundError,
  {
    user: User
  }
>

@Injectable()
export class FindUserById {
  constructor(private readonly usersRepository: UsersRepository) {}

  async execute({ id }: FindUserByIdRequest): Promise<FindUserByIdResponse> {
    const user = await this.usersRepository.findById(id)
    if (!user) return left(new UserNotFoundError())

    return right({ user })
  }
}
