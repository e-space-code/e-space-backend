import { Either, left, right } from '@/core/either'
import { Document, DocumentTypeEnum } from '../../enterprise/entities/document'
import { EntityTypeEnum, User } from '../../enterprise/entities/user'
import { UsersRepository } from '../repositories/users.repository'
import { EncryptService } from '../services/encrypt.service'
import { EmailOrUsernameTakenError } from './errors/email-or-username-taken.error'
import { Injectable } from '@nestjs/common'

export type RegisterNewUserRequest = {
  name: string
  email: string
  username: string
  password: string
  dateOfBirth: Date
  entityType: EntityTypeEnum
  document: {
    type: DocumentTypeEnum
    number: string
  }
}

export type RegisterNewUserResponse = Either<
  EmailOrUsernameTakenError,
  { user: User }
>

@Injectable()
export class RegisterNewUser {
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly encryptService: EncryptService,
  ) {}

  async execute(
    data: RegisterNewUserRequest,
  ): Promise<RegisterNewUserResponse> {
    const emailOrUsernameInUse = await this.usersRepository.findBy({
      email: data.email,
      username: data.username,
    })
    if (emailOrUsernameInUse) return left(new EmailOrUsernameTakenError())

    const userDocument = Document.create({
      number: data.document.number,
      type: data.document.type,
    })

    const encryptedPassword = await this.encryptService.toHash(data.password)
    const user = User.create({
      ...data,
      document: userDocument,
      password: encryptedPassword,
    })

    const dbUser = await this.usersRepository.create(user)

    return right({ user: dbUser })
  }
}
