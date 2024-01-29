import { EncryptService } from '@/domain/management/application/services/encrypt.service'

export class TestEncryptService implements EncryptService {
  async toHash(data: string): Promise<string> {
    return `${data}HASHED`
  }

  async compare(data: string, encryptedData: string): Promise<boolean> {
    return `${data}HASHED` === encryptedData
  }
}
