import { User } from '../../enterprise/entities/user'

export type FindByOptions = {
  email?: string
  username?: string
}

export abstract class UsersRepository {
  abstract create(user: User): Promise<User>
  abstract findById(id: string): Promise<User>
  abstract findAll(): Promise<User[]>
  abstract findBy(options: FindByOptions): Promise<User>
}
