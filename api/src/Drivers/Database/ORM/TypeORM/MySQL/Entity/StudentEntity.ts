import {
  Entity,
  CreateDateColumn,
  PrimaryColumn,
  UpdateDateColumn,
  Column,
  OneToOne,
  JoinColumn
} from 'typeorm'
import { UserEntity } from './UserEntity'

@Entity('student')
export class StudentEntity {
  @PrimaryColumn()
  id: string

  @Column({
    name: 'academic_registry'
  })
  academicRegistry: string

  @CreateDateColumn({ name: 'created_at', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt?: Date

  @UpdateDateColumn({
    name: 'updated_at',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'
  })
  updatedAt?: Date

  @OneToOne(() => UserEntity, {
    onDelete: 'CASCADE',
    orphanedRowAction: 'delete',
    cascade: true
  })
  @JoinColumn({
    name: 'user_id'
  })
  user?: UserEntity

  constructor(academicRegistry: string, id: string) {
    this.academicRegistry = academicRegistry
    this.id = id
  }
}
