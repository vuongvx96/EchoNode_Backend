import { Result } from '../result'

interface IUseCaseError {
  message: string
}

export abstract class UseCaseError implements IUseCaseError {
  public readonly message: string

  constructor(message: string) {
    this.message = message
  }
}

export class ValidationError extends Result<UseCaseError> {
  constructor(message: string) {
    super(false, message)
  }
}
