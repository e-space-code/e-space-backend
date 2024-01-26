import { describe } from 'node:test'
import { InMemoryUsersRepository } from 'test/repositories/in-memory-users.repository'
import { FindAllUsers } from './find-all-users'
import { makeUser } from 'test/factories/make-user'
import { User } from '../../enterprise/entities/user'

describe('Unit Testing: Find All Users', () => {
  let inMemoryUsersRepository: InMemoryUsersRepository
  let sut: FindAllUsers

  beforeEach(() => {
    inMemoryUsersRepository = new InMemoryUsersRepository()
    sut = new FindAllUsers(inMemoryUsersRepository)
  })

  it('Should be able to find all users', async () => {
    const numberOfUsers = 10

    for (let i = 0; i < numberOfUsers; i++) {
      const user = makeUser()

      await inMemoryUsersRepository.create(user)
    }

    const result = await sut.execute()

    expect(result.isLeft()).toBeFalsy()
    expect(result.isRight()).toBeTruthy()
    expect(result.value.users).toBeInstanceOf(Array<User>)
    expect(result.value.users).toHaveLength(numberOfUsers)
  })
})
