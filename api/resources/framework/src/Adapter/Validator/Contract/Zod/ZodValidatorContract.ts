import { ErrorDetail, InvalidDataException } from '../../../../Domain'
import { IValidatorContract } from '../../Interface'
import { AnyZodObject, ZodOptional, ZodError } from 'zod'

export abstract class ZodValidatorContract
  implements IValidatorContract<AnyZodObject | ZodOptional<AnyZodObject>>
{
  async validateSchema<TPayload = any>(
    schema: AnyZodObject | ZodOptional<AnyZodObject>,
    payload: TPayload
  ): Promise<void> {
    try {
      await schema.parseAsync(payload)
    } catch (error) {
      if (!(error instanceof ZodError)) {
        throw new Error('Unkown error')
      }

      throw new InvalidDataException(
        'Invalid data.',
        error.issues.map(
          e =>
            new ErrorDetail(
              `${e.path.length ? `${e.path.join('.')}.` : ''}${e.code}`,
              e.message,
              []
            )
        )
      )
    }
  }
}
