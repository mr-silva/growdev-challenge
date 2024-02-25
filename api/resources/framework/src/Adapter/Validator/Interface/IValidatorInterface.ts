export interface IValidatorContract<TSchema> {
  validateSchema<TPayload>(schema: TSchema, payload: TPayload): Promise<void>
}
