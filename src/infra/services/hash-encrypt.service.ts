import { hash, compare as compareHash } from 'bcrypt-ts'
import { EncryptService } from '@/domain/management/application/services/encrypt.service'
import { Injectable } from '@nestjs/common'

@Injectable()
export class HashEncryptService implements EncryptService {
  async toHash(data: string): Promise<string> {
    return await hash(data, 10)
  }

  async compare(data: string, encryptedData: string): Promise<boolean> {
    return await compareHash(data, encryptedData)
  }
}
