import { Module } from '@nestjs/common'
import { EnvModule } from './infra/env/env.module'
import { envSchema } from './infra/env/env'
import { ConfigModule } from '@nestjs/config'

@Module({
  imports: [
    ConfigModule.forRoot({
      validate: (env) => envSchema.parse(env),
      isGlobal: true,
    }),
    EnvModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
