import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import {
  Document,
  DocumentProps,
  DocumentTypeEnum,
} from '@/domain/management/enterprise/entities/document'
import { faker } from '@faker-js/faker'

export const makeDocument = (
  override: Partial<DocumentProps> = {},
  id?: UniqueEntityID,
) => {
  return Document.create(
    {
      number:
        override.number ?? faker.number.bigInt({ min: 12345678900 }).toString(),
      type: override.type ?? DocumentTypeEnum.CPF,
    },
    id,
  )
}
