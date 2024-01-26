import { FindAllUsers } from '@/domain/management/application/use-cases/find-all-users'
import { BadGatewayException, Controller, Get } from '@nestjs/common'

@Controller('users')
export class FindAllUsersController {
  constructor(private readonly findAllUsers: FindAllUsers) {}

  @Get()
  async handler() {
    const result = await this.findAllUsers.execute()

    if (result.isLeft()) throw new BadGatewayException()

    return { data: result.value.users }
  }
}
