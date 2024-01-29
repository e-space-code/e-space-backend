import { Module } from '@nestjs/common'
import { EncryptService } from '@/domain/management/application/services/encrypt.service'
import { HashEncryptService } from './hash-encrypt.service'

@Module({
  providers: [
    {
      provide: EncryptService,
      useClass: HashEncryptService,
    },
  ],
  exports: [HashEncryptService],
})
export class ServicesModule {}
