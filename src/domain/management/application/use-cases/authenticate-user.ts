import { Either, left, right } from '@/core/either'
import { User } from '../../enterprise/entities/user'
import { UsersRepository } from '../repositories/users.repository'
import { EncryptService } from '../services/encrypt.service'
import { InvalidCredentialsError } from './errors/invalid-credentials.error'
import { Injectable } from '@nestjs/common'

export type AuthenticateUserRequest = {
  username?: string
  email?: string
  password: string
}

export type AuthenticateUserResponse = Either<
  InvalidCredentialsError,
  {
    user: User
  }
>

@Injectable()
export class AuthenticateUser {
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly encryptService: EncryptService,
  ) {}

  async execute(
    data: AuthenticateUserRequest,
  ): Promise<AuthenticateUserResponse> {
    const user = await this.usersRepository.findBy({
      username: data.username,
      email: data.email,
    })
    if (!user) return left(new InvalidCredentialsError())

    const passwordsMatch = await this.encryptService.compare(
      data.password,
      user.password,
    )

    if (!passwordsMatch) return left(new InvalidCredentialsError())

    return right({ user })
  }
}
