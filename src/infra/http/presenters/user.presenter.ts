import { User } from '@/domain/management/enterprise/entities/user'

export class UserPresenter {
  static toHttp(user: User) {
    return {
      name: user.name,
      email: user.email,
      entityType: user.entityType,
      dateOfBirth: user.dateOfBirth,
    }
  }
}
