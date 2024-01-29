import { InMemoryUsersRepository } from 'test/repositories/in-memory-users.repository'
import { RegisterNewUser } from './register-new-user'
import { DocumentTypeEnum } from '../../enterprise/entities/document'
import { TestEncryptService } from 'test/services/test-encrypt.service'
import { makeUser } from 'test/factories/make-user'
import { EmailOrUsernameTakenError } from './errors/email-or-username-taken.error'
import { EntityTypeEnum } from '../../enterprise/entities/user'

describe('Unit testing: Register new user', () => {
  let inMemoryUsersRepository: InMemoryUsersRepository
  let testEncryptService: TestEncryptService
  let sut: RegisterNewUser

  beforeEach(() => {
    inMemoryUsersRepository = new InMemoryUsersRepository()
    testEncryptService = new TestEncryptService()
    sut = new RegisterNewUser(inMemoryUsersRepository, testEncryptService)
  })

  it('Should be able to register a new user', async () => {
    const newUserRequest = {
      name: 'user-1',
      email: 'user1@test.com',
      username: 'p1',
      password: 'password1',
      dateOfBirth: new Date('2003-01-01'),
      entityType: EntityTypeEnum.PESSOA_FISICA,
      document: {
        type: DocumentTypeEnum.CPF,
        number: '12345678900',
      },
    }

    const result = await sut.execute(newUserRequest)

    expect(result.isRight()).toBeTruthy()
    expect(inMemoryUsersRepository.items).toHaveLength(1)
    expect(inMemoryUsersRepository.items[0].name).toEqual(newUserRequest.name)
    expect(inMemoryUsersRepository.items[0].password).toEqual(
      `${newUserRequest.password}HASHED`,
    )
  })

  it('Should not be able to register a new user if email is taken', async () => {
    const email = 'user1@test.com'
    const fakerUser = makeUser({ email })

    await inMemoryUsersRepository.create(fakerUser)

    const newUserRequest = {
      name: 'user-1',
      email,
      username: 'p1',
      password: 'password1',
      dateOfBirth: new Date('2003-01-01'),
      document: {
        type: DocumentTypeEnum.CPF,
        number: '12345678900',
      },
      entityType: EntityTypeEnum.PESSOA_FISICA,
    }

    const result = await sut.execute(newUserRequest)

    expect(result.isLeft()).toBeTruthy()
    expect(result.isRight()).toBeFalsy()
    expect(result.value).toBeInstanceOf(EmailOrUsernameTakenError)
  })
})
