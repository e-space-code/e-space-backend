import { InMemoryUsersRepository } from 'test/repositories/in-memory-users.repository'
import { TestEncryptService } from 'test/services/test-encrypt.service'
import { makeUser } from 'test/factories/make-user'
import { AuthenticateUser } from './authenticate-user'
import { InvalidCredentialsError } from './errors/invalid-credentials.error'

describe('Unit testing: Authenticating user', () => {
  let inMemoryUsersRepository: InMemoryUsersRepository
  let testEncryptService: TestEncryptService
  let sut: AuthenticateUser

  beforeEach(() => {
    inMemoryUsersRepository = new InMemoryUsersRepository()
    testEncryptService = new TestEncryptService()
    sut = new AuthenticateUser(inMemoryUsersRepository, testEncryptService)
  })

  it('Should be able to authenticate a user with correct password', async () => {
    const email = 'test@test.com'
    const password = 'password-1'

    const fakeUser = makeUser({ email, password: password + 'HASHED' })

    await inMemoryUsersRepository.create(fakeUser)

    const result = await sut.execute({ email, password })

    expect(result.isRight()).toBeTruthy()
    expect(result.isLeft()).toBeFalsy()

    if (result.isRight()) expect(result.value.user).toMatchObject(fakeUser)
  })

  it('Should not be able to authenticate a user that does not exist', async () => {
    const email = 'test@test.com'
    const password = 'password-1'

    const result = await sut.execute({ email, password })

    expect(result.isLeft()).toBeTruthy()
    expect(result.isRight()).toBeFalsy()
    expect(result.value).toBeInstanceOf(InvalidCredentialsError)
  })

  it('Should not be able to authenticate a user with incorrect password', async () => {
    const email = 'test@test.com'
    const password = 'password-1'

    const fakeUser = makeUser({ email, password: 'password-5HASHED' })

    await inMemoryUsersRepository.create(fakeUser)

    const result = await sut.execute({ email, password })

    expect(result.isLeft()).toBeTruthy()
    expect(result.isRight()).toBeFalsy()
    expect(result.value).toBeInstanceOf(InvalidCredentialsError)
  })
})
