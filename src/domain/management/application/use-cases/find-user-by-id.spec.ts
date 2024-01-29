import { describe } from 'node:test'
import { FindUserById } from './find-user-by-id'
import { InMemoryUsersRepository } from 'test/repositories/in-memory-users.repository'
import { makeUser } from 'test/factories/make-user'
import { User } from '../../enterprise/entities/user'
import { UserNotFoundError } from './errors/user-not-found.error'

describe('Unit Testing: Find user by id', () => {
  let inMemoryUsersRepository: InMemoryUsersRepository
  let sut: FindUserById

  beforeEach(() => {
    inMemoryUsersRepository = new InMemoryUsersRepository()
    sut = new FindUserById(inMemoryUsersRepository)
  })

  it('Should be able to find a user by id', async () => {
    const user = makeUser()

    await inMemoryUsersRepository.create(user)

    const result = await sut.execute({ id: user.id.toString() })

    expect(result.isLeft()).toBeFalsy()
    expect(result.isRight()).toBeTruthy()
    expect(result.value).not.toBeInstanceOf(UserNotFoundError)

    if ((result.value as { user: User }) instanceof User)
      expect(result.value).toBeInstanceOf(User)
  })
})
