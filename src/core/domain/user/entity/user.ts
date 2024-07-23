import { AggregateRoot, Guard, Result, UniqueEntityID } from '../../../common'
import { UserEmail } from './userEmail'
import { UserId } from './userId'
import { UserName } from './userName'
import { UserPassword } from './userPassword'

interface UserProps {
  email: UserEmail
  username: UserName
  password: UserPassword
  isEmailVerified?: boolean
  lastLogin?: Date
}

export class User extends AggregateRoot<UserProps> {
  get userId(): UserId {
    return UserId.create(this._id).getValue()
  }

  get email(): UserEmail {
    return this.props.email
  }

  get username(): UserName {
    return this.props.username
  }

  get password(): UserPassword {
    return this.props.password
  }

  get isEmailVerified(): boolean {
    return this.props.isEmailVerified
  }

  get lastLogin(): Date {
    return this.props.lastLogin
  }

  private constructor(props: UserProps, id?: UniqueEntityID) {
    super(props, id)
  }

  public static create(props: UserProps, id?: UniqueEntityID): Result<User> {
    const guardResult = Guard.againstNullOrUndefinedBulk([
      { argument: props.username, argumentName: 'username' },
      { argument: props.email, argumentName: 'email' },
    ])

    if (guardResult.isFailure) {
      return Result.fail<User>(guardResult.getErrorValue())
    }

    const user = new User(
      {
        ...props,
        isEmailVerified: props.isEmailVerified ? props.isEmailVerified : false,
      },
      id
    )

    return Result.ok<User>(user)
  }
}
