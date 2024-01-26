import { Entity } from '@/core/entities/entity'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Document } from './document'

export enum EntityTypeEnum {
  PESSOA_FISICA = 'PESSOA_FISICA',
  PESSOA_JURIDICA = 'PESSOA_JURIDICA',
}

export type UserProps = {
  name: string
  email: string
  username: string
  password: string
  dateOfBirth: Date
  document: Document
  entityType: EntityTypeEnum
}

export class User extends Entity<UserProps> {
  get name(): string {
    return this.props.name
  }

  get email(): string {
    return this.props.email
  }

  get username(): string {
    return this.props.username
  }

  get password(): string {
    return this.props.password
  }

  get dateOfBirth(): Date {
    return this.props.dateOfBirth
  }

  get entityType(): EntityTypeEnum {
    return this.props.entityType
  }

  public static create(props: UserProps, id?: UniqueEntityID): User {
    return new User(props, id)
  }
}
