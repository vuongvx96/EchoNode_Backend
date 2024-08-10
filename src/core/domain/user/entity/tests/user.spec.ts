import { Result, UniqueEntityID } from '@core/common'
import { UserEmail, UserEmailProps } from '../userEmail'
import { User, UserProps } from '../user'
import { UserId } from '../userId'
import { UserName, UserNameProps } from '../userName'
import { IUserPasswordProps, UserPassword } from '../userPassword'

describe('user', () => {
  describe('create', () => {
    it('should create a user when give full valid information for user', () => {
      const userEmailProps: string = 'dangkhoanguyen0812@gmail.com'
      const userNameProps: UserNameProps = {name: 'dangkhoa'}
      const userPasswordProps: IUserPasswordProps = {value: 'khoa.nguyen0812'}
      const userIdProps: UniqueEntityID = new UniqueEntityID('315c26c2-39ea-4322-ae33-fc7ee0fc6414')

      const userEmail: Result<UserEmail> = UserEmail.create(userEmailProps)
      const userName: Result<UserName> = UserName.create(userNameProps)
      const userPassword: Result<UserPassword> = UserPassword.create(userPasswordProps)
      const userId: Result<UserId> = UserId.create(userIdProps)

      const userProps: UserProps = {
        email: userEmail.getValue(),
        username: userName.getValue(),
        password: userPassword.getValue(),
        isEmailVerified: true,
        lastLogin: new Date()
      }

      const actual: Result<User> = User.create(userProps, userIdProps)
      const user: User = actual.getValue()

      expect(actual.isSuccess).toBe(true)
      expect(user).toBeInstanceOf(User)
      expect(user.isEmailVerified).toBe(true)
      expect(user.lastLogin).toBe(userProps.lastLogin)
      expect(user.email.value).toBe('dangkhoanguyen0812@gmail.com')
      expect(user.username.value).toBe('dangkhoa')
      expect(user.password.value).toBe('khoa.nguyen0812')
      expect(user.userId.getStringValue()).toBe('315c26c2-39ea-4322-ae33-fc7ee0fc6414')
    })
  })

  it('should not create a user when the email is missing', () => {
      const userEmailProps: string = 'dangkhoanguyen0812@gmail.com'
      const userNameProps: UserNameProps = {name: 'dangkhoa'}
      const userIdProps: UniqueEntityID = new UniqueEntityID('315c26c2-39ea-4322-ae33-fc7ee0fc6414')
      const userPasswordProps: IUserPasswordProps = {value: 'khoa.nguyen0812'}

      const userEmail: Result<UserEmail> = UserEmail.create(userEmailProps)
      const userId: Result<UserId> = UserId.create(userIdProps)
      const userName: Result<UserName> = UserName.create(userNameProps)
      const userPassword: Result<UserPassword> = UserPassword.create(userPasswordProps)

      const userMissingEmailProps : UserProps = {
        email: undefined,
        username: userName.getValue(),
        password: userPassword.getValue()
      }

      const actual: Result<User> = User.create(userMissingEmailProps)

      expect(actual.isFailure).toBeTruthy
      expect(actual.getErrorValue()).toBe('email is null or undefined')
  })

  it('should not create a user when the username is missing', () => {
      const userEmailProps: string = 'dangkhoanguyen0812@gmail.com'
      const userNameProps: UserNameProps = {name: 'dangkhoa'}
      const userIdProps: UniqueEntityID = new UniqueEntityID('315c26c2-39ea-4322-ae33-fc7ee0fc6414')
      const userPasswordProps: IUserPasswordProps = {value: 'khoa.nguyen0812'}

      const userEmail: Result<UserEmail> = UserEmail.create(userEmailProps)
      const userId: Result<UserId> = UserId.create(userIdProps)
      const userName: Result<UserName> = UserName.create(userNameProps)
      const userPassword: Result<UserPassword> = UserPassword.create(userPasswordProps)

      const userMissingEmailProps : UserProps = {
        email: userEmail.getValue(),
        username: undefined,
        password: userPassword.getValue()
      }

      const actual: Result<User> = User.create(userMissingEmailProps)

      expect(actual.isFailure).toBeTruthy
      expect(actual.getErrorValue()).toBe('username is null or undefined')
  })
})
