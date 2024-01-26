import { Module } from '@nestjs/common'
import { RegisterNewUserController } from './controllers/register-new-user.controller'
import { RegisterNewUser } from '@/domain/management/application/use-cases/register-new-user'
import { FindAllUsersController } from './controllers/find-all-users.controller'
import { FindAllUsers } from '@/domain/management/application/use-cases/find-all-users'

@Module({
  controllers: [RegisterNewUserController, FindAllUsersController],
  providers: [RegisterNewUser, FindAllUsers],
})
export class HttpModule {}
