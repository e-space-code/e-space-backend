import { Module } from '@nestjs/common'
import { EnvModule } from './infra/env/env.module'
import { envSchema } from './infra/env/env'
import { ConfigModule } from '@nestjs/config'
import { HttpModule } from './infra/http/http.module'
import { ServicesModule } from './infra/services/services.module'

@Module({
  imports: [
    ConfigModule.forRoot({
      validate: (env) => envSchema.parse(env),
      isGlobal: true,
    }),
    EnvModule,
    HttpModule,
    ServicesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
