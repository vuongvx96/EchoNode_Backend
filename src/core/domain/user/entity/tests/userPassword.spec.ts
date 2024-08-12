import { Result } from '@core/common'

import { IUserPasswordProps, UserPassword } from '../user-password'

describe('UserPassword', () => {
  describe('create', () => {
    it('should return success userPassword when give valid password', () => {
      const IUserPasswordProps: IUserPasswordProps = {
        value: 'dangkhoa',
      }

      const actual: Result<UserPassword> =
        UserPassword.create(IUserPasswordProps)

      expect(actual.isSuccess).toBe(true)
      expect(actual.getValue().value).toBe(IUserPasswordProps.value)
    })

    it('should return failure userPassword when give null or undefined password', () => {
      const invalidIUserNameProps: IUserPasswordProps = {
        value: undefined,
      }

      const actual: Result<UserPassword> = UserPassword.create(
        invalidIUserNameProps
      )

      expect(actual.isFailure).toBe(true)
      expect(actual.getErrorValue()).toBe('password is null or undefined')
    })

    it('should return failure userPassword when give a password have less than 6 character', () => {
      const invalidIUserNameProps: IUserPasswordProps = {
        value: 'ndk',
      }

      const actual: Result<UserPassword> = UserPassword.create(
        invalidIUserNameProps
      )

      expect(actual.getErrorValue()).toBe(
        "Password doesn't meet criteria [6 chars min]."
      )
    })
  })
})
