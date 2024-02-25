import { Response } from 'express'
import { HttpStatusEnum } from '../Enum/HttpStatusEnum'
import { PaginatedList } from '../../../Domain'
import { IResponseBody } from '../Interface'

export class ResponseEntity<TBody> {
  private status: HttpStatusEnum
  private body: IResponseBody<TBody> | null

  constructor(response: Response, body?: IResponseBody<TBody>)
  constructor(response: Response, body?: IResponseBody<TBody>, status?: HttpStatusEnum)

  constructor(
    private readonly response: Response,
    body?: IResponseBody<TBody>,
    status?: HttpStatusEnum
  ) {
    this.body = body || null
    this.status = status || (body ? HttpStatusEnum.OK : HttpStatusEnum.NO_CONTENT)
  }

  protected setBody(body: IResponseBody<TBody>) {
    this.body = body
    return this
  }

  public addHeader(name: string, value: string) {
    this.response.set(name, value)
  }

  public build() {
    return this.response.status(this.status).send(this.body || undefined)
  }

  public ok(body: TBody) {
    this.status = HttpStatusEnum.OK
    this.setBody({
      status: this.status,
      data: body
    })

    return this.build()
  }

  public list<Item>(items: Array<Item>, total: number) {
    this.status = HttpStatusEnum.OK
    this.setBody({
      status: this.status,
      data: new PaginatedList(items, total) as any
    })

    return this.build()
  }

  public created(body: TBody) {
    this.status = HttpStatusEnum.CREATED
    this.setBody({
      status: this.status,
      data: body
    })

    return this.build()
  }

  public error(status: HttpStatusEnum, body: TBody) {
    this.status = status
    this.setBody({
      status: this.status,
      data: body
    })

    return this.build()
  }

  public noContent() {
    this.status = HttpStatusEnum.NO_CONTENT
    this.setBody({
      status: this.status,
      data: {} as TBody
    })

    return this.build()
  }
}
