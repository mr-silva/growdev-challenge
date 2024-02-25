import { FindOptionsWhere, Repository as TypeOrmRepository, ObjectLiteral } from 'typeorm'
import { SelectQueryBuilder } from 'typeorm/query-builder/SelectQueryBuilder'
import { IEntityDataMapper } from '../../../../../DataMapper'
import {
  DataNotFoundException,
  PaginatedListFiltersDTO,
  IRepository,
  PaginatedList,
  SearchableFiltersDTO
} from '../../../../../Domain'

export abstract class TypeORMMySQLRepositoryContract<
  TDomainEntity,
  TDaoEntity extends ObjectLiteral,
  TSearchableFilters extends SearchableFiltersDTO = SearchableFiltersDTO
> implements IRepository<TDomainEntity, TSearchableFilters>
{
  /**
   * Repositório do ORM.
   *
   * @template TDaoEntity
   *
   * @property {TypeOrmRepository<TDaoEntity>} repository
   */
  protected readonly repository: TypeOrmRepository<TDaoEntity>

  /**
   * Conversor dos dados entre banco de dados e domínio.
   *
   * @template TDomainEntity
   * @template TDaoEntity
   *
   * @property {IEntityDataMapper<TDomainEntity, TDaoEntity>} dataMapper
   */
  protected readonly dataMapper: IEntityDataMapper<TDomainEntity, TDaoEntity>

  public constructor(
    repository: TypeOrmRepository<TDaoEntity>,
    dataMapper: IEntityDataMapper<TDomainEntity, TDaoEntity>
  ) {
    this.repository = repository
    this.dataMapper = dataMapper
  }

  /**
   * @inheritDoc
   */
  public async getPaginatedList(
    filters: TSearchableFilters,
    paginationFilters: PaginatedListFiltersDTO
  ): Promise<PaginatedList<TDomainEntity>> {
    const query = this.applyPaginator(
      paginationFilters,
      this.applySearch(
        this.customToGetAllOrList(this.repository.createQueryBuilder(), filters),
        filters
      )
    )

    return new PaginatedList(
      this.dataMapper.toDomainMany(await query.getMany()),
      await query.getCount()
    )
  }

  /**
   * @inheritDoc
   */
  public async getAll(filters: TSearchableFilters): Promise<TDomainEntity[]> {
    const query = this.applySearch(
      this.customToGetAllOrList(this.repository.createQueryBuilder(), filters),
      filters
    )

    return this.dataMapper.toDomainMany(await query.getMany())
  }

  /**
   * @inheritDoc
   */
  public async getOneById(id: string): Promise<TDomainEntity | null> {
    const query = this.customToGetOneById(
      this.repository.createQueryBuilder().andWhere(`${this.getTableName()}.id = :id`, { id })
    )

    const entity = await query.getOne()

    if (!entity) return null

    return this.dataMapper.toDomain(entity)
  }

  /**
   * @inheritDoc
   */
  public async create(entity: TDomainEntity): Promise<TDomainEntity> {
    return this.save(entity)
  }

  /**
   * @inheritDoc
   */
  public async save(entity: TDomainEntity): Promise<TDomainEntity> {
    const result = await this.repository.save(this.dataMapper.toDaoEntity(entity))

    return this.dataMapper.toDomain(result)
  }

  /**
   * @inheritDoc
   */
  public async delete(
    criteria: string | string[] | number | number[] | Date | Date[] | FindOptionsWhere<TDaoEntity>
  ): Promise<void> {
    await this.repository.delete(criteria)
  }

  /**
   * @inheritDoc
   */
  public async update(
    entity: TDomainEntity,
    conditions: string | string[] | number | number[] | Date | Date[] | FindOptionsWhere<TDaoEntity>
  ): Promise<boolean> {
    const result = await this.repository.update(conditions, this.dataMapper.toDaoEntity(entity))

    return !!result.affected
  }

  /**
   * Aplica paginação na 'query'.
   *
   * @template TDaoEntity
   *
   * @param {PaginatedListFiltersDTO} filters
   * @param {SelectQueryBuilder<TDaoEntity>} query
   *
   * @returns {SelectQueryBuilder<TDaoEntity>}
   */
  public applyPaginator(
    filters: PaginatedListFiltersDTO,
    query: SelectQueryBuilder<TDaoEntity>
  ): SelectQueryBuilder<TDaoEntity> {
    const skip = (filters.getPage() - 1) * filters.getSize()
    const size = filters.getSize()

    return query.skip(skip).take(size)
  }

  /**
   * Permite aplicar modificações na 'query' do método getAll().
   *
   * @template TDaoEntity
   *
   * @param {TSearchableFilters} filters
   * @param {SelectQueryBuilder<TDaoEntity>} query
   *
   * @returns {SelectQueryBuilder<TDaoEntity>}
   */
  protected customToGetAllOrList(
    query: SelectQueryBuilder<TDaoEntity>,
    filters: TSearchableFilters
  ): SelectQueryBuilder<TDaoEntity> {
    return query
  }

  /**
   * Permite aplicar modificações na 'query' do método getOneById().
   *
   * @template TDaoEntity
   *
   * @param {SelectQueryBuilder<TDaoEntity>} query
   *
   * @returns {SelectQueryBuilder<TDaoEntity>}
   */
  protected customToGetOneById(
    query: SelectQueryBuilder<TDaoEntity>
  ): SelectQueryBuilder<TDaoEntity> {
    return query
  }

  /**
   * Aplica na 'query' as condições para o filtro de campo de busca.
   *
   * @template TDaoEntity
   *
   * @param {SearchableFiltersDto} filters
   * @param {SelectQueryBuilder<TDaoEntity>} query
   *
   * @returns {SelectQueryBuilder<TDaoEntity>}
   */
  protected applySearch(
    query: SelectQueryBuilder<TDaoEntity>,
    filters: SearchableFiltersDTO
  ): SelectQueryBuilder<TDaoEntity> {
    if (!filters?.getQuery() || !this.getFieldsToSearch().length) return query

    const fieldsToWhere: string[] = []
    for (const field of this.getFieldsToSearch()) {
      fieldsToWhere.push(`${field} like '%${filters.getQuery()}%'`)
    }

    query.andWhere(`(${fieldsToWhere.join(' OR ')})`)

    return query
  }

  /**
   * Retorna a página para a query.
   *
   * @returns {string[]}
   */
  protected getFieldsToSearch(): string[] {
    return []
  }

  protected hasColumn(columnName: string): boolean {
    return this.repository.metadata.columns.map(column => column.propertyName).includes(columnName)
  }

  protected hasRelation(propertyName: string): boolean {
    return this.repository.metadata.relations
      .map(relation => relation.propertyName)
      .includes(propertyName)
  }

  protected getTableName(): string {
    return this.repository.metadata.targetName
  }
}
