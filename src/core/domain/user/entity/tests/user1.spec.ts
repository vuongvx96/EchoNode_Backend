import { Result, UniqueEntityID } from '@core/common'
import { UserEmail } from '../userEmail'
import { User, UserProps } from '../user'
import { UserId } from '../userId'
import { UserName, UserNameProps } from '../userName'
import { IUserPasswordProps, UserPassword } from '../userPassword'

describe('user', () => {
  const createValidUserProps = (
    userNameProps: UserNameProps,
    userEmailProps: string,
    userPasswordProps: IUserPasswordProps,
    userId?: UniqueEntityID
  ): UserProps => {
    const userName: Result<UserName> = UserName.create(userNameProps)
    const userEmail: Result<UserEmail> = UserEmail.create(userEmailProps)
    const userPassword: Result<UserPassword> =
      UserPassword.create(userPasswordProps)

    return {
      username: userName.isSuccess ? userName.getValue() : null,
      email: userEmail.isSuccess ? userEmail.getValue() : null,
      password: userPassword.getValue(),
      isEmailVerified: true,
      lastLogin: new Date(),
    }
  }

  const createUserId = (id: string): UniqueEntityID => {
    return new UniqueEntityID(id)
  }

  describe('create', () => {
    it('should create a user successfully when given full valid information', () => {
      const userProps: UserProps = createValidUserProps(
        { name: 'dangkhoagenz' },
        'dangkhoanguyen0812@gmail.com',
        { value: 'khoa.nguyen0812' }
      )
      const userId: UniqueEntityID = createUserId(
        '92ec9362-70d7-40f0-bef7-27eff7feb797'
      )
      const actual: Result<User> = User.create(userProps, userId)
      const user: User = actual.getValue()

      expect(actual.isSuccess).toBe(true)
      expect(user).toBeInstanceOf(User)
      expect(user.username.value).toBe('dangkhoagenz')
      expect(user.email.value).toBe('dangkhoanguyen0812@gmail.com')
      expect(user.password.value).toBe('khoa.nguyen0812')
      expect(user.userId.getStringValue()).toBe(
        '92ec9362-70d7-40f0-bef7-27eff7feb797'
      )
      expect(user.isEmailVerified).toBe(true)
      expect(user.lastLogin).toBe(userProps.lastLogin)
    })

    it('should not create a user when username is null or undefined', () => {
      const userProps: UserProps = createValidUserProps(
        { name: undefined },
        'dangkhoanguyen0812@gmail.com',
        { value: 'khoa.nguyen0812' }
      )
      const userId: UniqueEntityID = createUserId(
        '92ec9362-70d7-40f0-bef7-27eff7feb797'
      )
      const actual: Result<User> = User.create(userProps, userId)

      expect(actual.isFailure).toBe(true)
      expect(actual.getErrorValue()).toBe('username is null or undefined')
    })

    it('should not create a user when email is null or undefined', () => {
      const userProps: UserProps = createValidUserProps(
        { name: 'dangkhoa' },
        null,
        { value: 'khoa.nguyen0812' }
      )
      const userId: UniqueEntityID = createUserId(
        '92ec9362-70d7-40f0-bef7-27eff7feb797'
      )
      const actual: Result<User> = User.create(userProps, userId)

      expect(actual.isFailure).toBe(true)
      expect(actual.getErrorValue()).toBe('email is null or undefined')
    })
  })
})
