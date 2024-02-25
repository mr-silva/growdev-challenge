import { HttpStatusEnum } from '../Enum'

export interface IResponseBody<TBody> {
  status: HttpStatusEnum
  data: TBody
}
