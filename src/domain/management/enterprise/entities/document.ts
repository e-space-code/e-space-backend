import { Entity } from '@/core/entities/entity'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'

export enum DocumentTypeEnum {
  CPF = 'CPF',
  CNPJ = 'CNPJ',
}

export type DocumentProps = {
  type: DocumentTypeEnum
  number: string
}

export class Document extends Entity<DocumentProps> {
  get type(): DocumentTypeEnum {
    return this.props.type
  }

  get number(): string {
    return this.props.number
  }

  public static create(props: DocumentProps, id?: UniqueEntityID): Document {
    return new Document(props, id)
  }
}
