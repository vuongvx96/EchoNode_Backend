import { Guard, Result, ValueObject } from '../../../common'

export interface IUserPasswordProps {
  value: string
}

export class UserPassword extends ValueObject<IUserPasswordProps> {
  public static minLength: number = 6

  get value(): string {
    return this.props.value
  }

  private constructor(props: IUserPasswordProps) {
    super(props)
  }

  public static create(props: IUserPasswordProps): Result<UserPassword> {
    const propsResult = Guard.againstNullOrUndefined(props.value, 'password')

    if (propsResult.isFailure) {
      return Result.fail<UserPassword>(propsResult.getErrorValue())
    }
    if (props.value.length < this.minLength) {
      return Result.fail<UserPassword>(
        `Password doesn\'t meet criteria [${this.minLength} chars min].`
      )
    }

    return Result.ok<UserPassword>(
      new UserPassword({
        value: props.value,
      })
    )
  }
}
