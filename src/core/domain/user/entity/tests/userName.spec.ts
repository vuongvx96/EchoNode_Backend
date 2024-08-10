import { UserName } from '../userName'
import { Result } from '@core/common'
import { UserNameProps } from '../userName'

describe('UserName', () => {
  describe('create', () => {
    it('should return success userName when give valid username', () => {
      const validUserNameProps: UserNameProps = {
        name: 'dangkhoa',
      }

      const actual: Result<UserName> = UserName.create(validUserNameProps)

      expect(actual.isSuccess).toBe(true)
      expect(actual.getValue()).toBeDefined()
      expect(actual.getValue().value).toBe(validUserNameProps.name)
    })

    it('should return failure userName when give null or undefined userName', () => {
      const undefinedUserNameProps: UserNameProps = {
        name: undefined,
      }
      const actual: Result<UserName> = UserName.create(undefinedUserNameProps)

      expect(actual.isFailure).toBe(true)
      expect(actual.getErrorValue()).toBe('username is null or undefined')
    })

    it('should return failure userName when give a userName have less than 2 character', () => {
      const lessThanMinCharacterRequiredUserNameProps: UserNameProps = {
        name: 'd',
      }

      const actual: Result<UserName> = UserName.create(
        lessThanMinCharacterRequiredUserNameProps
      )

      expect(actual.isFailure).toBe(true)
      expect(actual.getErrorValue()).toBe('Text is not at least 2 chars.')
    })
    it('should return failure userName when give a userName have more than 15 character', () => {
      const greaterThanMaxCharacterRequiredUserNameProps: UserNameProps = {
        name: 'dangkhoanguyendsadsdadsa',
      }

      const actual: Result<UserName> = UserName.create(
        greaterThanMaxCharacterRequiredUserNameProps
      )

      expect(actual.getErrorValue()).toBe('Text is greater than 15 chars.')
    })
  })
})
