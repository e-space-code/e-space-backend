export abstract class EncryptService {
  abstract toHash(data: string): Promise<string>
  abstract compare(data: string, encryptedData: string): Promise<boolean>
}
