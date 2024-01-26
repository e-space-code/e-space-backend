import { faker } from '@faker-js/faker'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import {
  EntityTypeEnum,
  User,
  UserProps,
} from '@/domain/management/enterprise/entities/user'
import { makeDocument } from './make-document'

export const makeUser = (
  override: Partial<UserProps> = {},
  id?: UniqueEntityID,
): User => {
  return User.create(
    {
      name: override.name ?? faker.person.fullName(),
      email: override.email ?? faker.internet.email(),
      username: override.username ?? faker.internet.userName(),
      dateOfBirth: override.dateOfBirth ?? faker.date.birthdate(),
      document: override.document ?? makeDocument(),
      password: override.password ?? faker.internet.password(),
      entityType: override.entityType ?? EntityTypeEnum.PESSOA_FISICA,
    },
    id,
  )
}
