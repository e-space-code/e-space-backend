import { RegisterNewUser } from '@/domain/management/application/use-cases/register-new-user'
import { BadRequestException, Body, Controller, Post } from '@nestjs/common'
import { z } from 'zod'
import { ZodValidationPipe } from '../pipes/zod-validation.pipe'
import { DocumentTypeEnum } from '@/domain/management/enterprise/entities/document'
import { EntityTypeEnum } from '@/domain/management/enterprise/entities/user'
import { UserPresenter } from '../presenters/user.presenter'

const registerNewUserBodySchema = z.object({
  name: z.string(),
  username: z.string(),
  password: z.string(),
  email: z.string().email(),
  dateOfBirth: z.coerce.date().transform((dateString, ctx) => {
    const date = new Date(dateString)
    if (!z.date().safeParse(date).success) {
      ctx.addIssue({
        code: z.ZodIssueCode.invalid_date,
      })
    }

    return date
  }),
  document: z.object({
    type: z.enum([DocumentTypeEnum.CPF, DocumentTypeEnum.CNPJ]),
    number: z.string().min(11).max(14),
  }),
  entityType: z.enum([
    EntityTypeEnum.PESSOA_FISICA,
    EntityTypeEnum.PESSOA_JURIDICA,
  ]),
})

const bodyValidationPipe = new ZodValidationPipe(registerNewUserBodySchema)
type RegisterNewUserBodyBodySchema = z.infer<typeof registerNewUserBodySchema>

@Controller('users')
export class RegisterNewUserController {
  constructor(private readonly registerNewUser: RegisterNewUser) {}

  @Post()
  async handler(@Body(bodyValidationPipe) body: RegisterNewUserBodyBodySchema) {
    const {
      name,
      username,
      password,
      email,
      dateOfBirth,
      document,
      entityType,
    } = body

    const { type, number } = document

    const result = await this.registerNewUser.execute({
      name,
      username,
      password,
      email,
      dateOfBirth: new Date(dateOfBirth),
      document: {
        type,
        number,
      },
      entityType,
    })

    if (result.isLeft()) throw new BadRequestException(result.value.message)

    return { data: UserPresenter.toHttp(result.value.user) }
  }
}
