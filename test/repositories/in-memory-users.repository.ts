import {
  FindByOptions,
  UsersRepository,
} from '@/domain/management/application/repositories/users.repository'
import { User } from '@/domain/management/enterprise/entities/user'

export class InMemoryUsersRepository implements UsersRepository {
  public items: User[] = []

  async create(user: User): Promise<User> {
    this.items.push(user)

    return user
  }

  async findById(id: string): Promise<User> {
    const user = this.items.find((item) => item.id.toString() === id)
    if (!user) return null

    return user
  }

  async findAll(): Promise<User[]> {
    return this.items
  }

  async findBy(options: FindByOptions): Promise<User> {
    const user = this.items.find(
      (item) =>
        item.email === options.email || item.username === options.username,
    )
    if (!user) return null

    return user
  }
}
