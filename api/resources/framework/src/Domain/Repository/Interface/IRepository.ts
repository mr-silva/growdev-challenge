import { PaginatedList } from '../../Entity'
import { PaginatedListFiltersDTO, SearchableFiltersDTO } from '../DTO'

export interface IRepository<
  TDomainEntity,
  TSearchableFilters extends SearchableFiltersDTO = SearchableFiltersDTO
> {
  /**
   * Retorna uma lista paginada de registros com total e items.
   *
   * @template TDomainEntity
   *
   * @param {TSearchableFilters} filters
   * @param {PaginatedListFiltersDTO} paginationFilters
   *
   * @returns {Promise<PaginatedList<TDomainEntity>>}
   */
  getPaginatedList(
    filters: TSearchableFilters,
    paginationFilters: PaginatedListFiltersDTO
  ): Promise<PaginatedList<TDomainEntity>>

  /**
   * Retorna uma lista de registros sem paginação.
   *
   * @template TDomainEntity
   *
   * @param {TSearchableFilters} filters
   *
   * @returns {Promise<TDomainEntity[]>}
   */
  getAll(filters: TSearchableFilters): Promise<Array<TDomainEntity>>

  /**
   * Retorna um único registro filtrando pelo id.
   *
   * @template TDomainEntity
   *
   * @param {string} id
   *
   * @returns {Promise<TDomainEntity>}
   */
  getOneById(id: string): Promise<TDomainEntity | null>

  /**
   * Exclui um único registro filtrando pelo id.
   *
   * @template TDomainEntity
   *
   * @param {{} | string} id
   *
   * @returns {Promise<void>}
   */
  delete(id: {} | string): Promise<void>

  /**
   * Cria um registro com base na entidade.
   *
   * @template TDomainEntity
   *
   * @param {TDomainEntity} entity
   *
   * @returns {Promise<TDomainEntity>}
   */
  create(entity: TDomainEntity): Promise<TDomainEntity>

  /**
   * Cria ou atualiza um registro com base na entidade.
   *
   * @template TDomainEntity
   *
   * @param {TDomainEntity} entity
   *
   * @returns {Promise<TDomainEntity>}
   */
  save(entity: TDomainEntity): Promise<TDomainEntity>

  /**
   * Atualiza um registro com base na entidade.
   *
   * @template TDomainEntity
   *
   * @param {TDomainEntity} entity
   * @param {{} | string} conditions
   *
   * @returns {Promise<TDomainEntity>}
   */
  update(entity: TDomainEntity, conditions: {} | string): Promise<TDomainEntity | boolean>
}
