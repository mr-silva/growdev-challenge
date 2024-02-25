import { SearchableFiltersDTO } from '@api/framework'

export class StudentSearcheableFiltersDTO extends SearchableFiltersDTO {
  constructor(query?: string) {
    super(query)
  }
}
