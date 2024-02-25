import { Column, CreateDateColumn, Entity, PrimaryColumn, UpdateDateColumn } from 'typeorm'

@Entity('user')
export class UserEntity {
  @PrimaryColumn()
  id: string

  @Column()
  name: string

  @Column({
    name: 'document_number'
  })
  documentNumber: string

  @Column()
  email: string

  @CreateDateColumn({ name: 'created_at', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt?: Date

  @UpdateDateColumn({
    name: 'updated_at',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'
  })
  updatedAt?: Date

  constructor(name: string, documentNumber: string, email: string, id: string) {
    this.id = id
    this.name = name
    this.documentNumber = documentNumber
    this.email = email
  }
}
