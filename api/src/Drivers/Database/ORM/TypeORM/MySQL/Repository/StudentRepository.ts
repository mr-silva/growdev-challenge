import { SearchableFiltersDTO, TypeORMMySQLRepositoryContract } from '@api/framework'
import { DataSource, SelectQueryBuilder } from 'typeorm'
import { Student, IStudentRepository } from '../../../../../../Domain'
import { StudentEntity } from '../Entity/'
import { studentDataMapperMediator } from '../DataMapper'

export class StudentRepository
  extends TypeORMMySQLRepositoryContract<Student, StudentEntity>
  implements IStudentRepository
{
  constructor(connection: DataSource) {
    super(connection.getRepository(StudentEntity), studentDataMapperMediator)
  }

  private defaultJoin(query: SelectQueryBuilder<StudentEntity>): SelectQueryBuilder<StudentEntity> {
    query.leftJoinAndSelect('StudentEntity.user', 'user')

    return query
  }

  protected customToGetOneById(
    query: SelectQueryBuilder<StudentEntity>
  ): SelectQueryBuilder<StudentEntity> {
    return this.defaultJoin(query)
  }

  protected customToGetAllOrList(
    query: SelectQueryBuilder<StudentEntity>,
    filters: SearchableFiltersDTO
  ): SelectQueryBuilder<StudentEntity> {
    return this.defaultJoin(query)
  }

  public async getOneByEmailOrDocumentNumber(
    email: string,
    documentNumber: string
  ): Promise<Student | null> {
    const query = this.defaultJoin(this.repository.createQueryBuilder())

    const result = await query
      .where('user.email = :email', { email })
      .orWhere('user.documentNumber = :documentNumber', { documentNumber })
      .getOne()

    if (!result) {
      return null
    }

    return this.dataMapper.toDomain(result)
  }

  public async getOneByEmail(email: string): Promise<Student | null> {
    const query = this.defaultJoin(this.repository.createQueryBuilder())

    const result = await query.where('user.email = :email', { email }).getOne()

    if (!result) {
      return null
    }

    return this.dataMapper.toDomain(result)
  }
}
