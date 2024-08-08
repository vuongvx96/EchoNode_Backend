import { UserName } from '../userName'
import { Result, UniqueEntityID } from '@core/common'
import { UserNameProps } from '../userName'
import exp from 'constants'

describe('UserName', () => {
  describe('create', () => {
    it('should return success userName when give valid username', () => {
      const validUserNameProps: UserNameProps = {
        name: 'dangkhoa',
      }

      const actual: Result<UserName> = UserName.create(validUserNameProps)

      expect(actual.isSuccess).toBe(true)
      expect(actual.getValue()).toBeDefined()
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
      const minLengthUserNameProps: UserNameProps = {
        name: 'd',
      }

      const actual: Result<UserName> = UserName.create(minLengthUserNameProps)

      const error = actual.getErrorValue
      expect(actual.isFailure).toBe(true)
      expect(error.length).toBeLessThanOrEqual(2)
    })
    it('should return failure userName when give a userName have more than 15 character', () => {
      const maxLengthUserNameProps: UserNameProps = {
        name: 'dangkhoanguyendsadsdadsa',
      }

      const actual: Result<UserName> = UserName.create(maxLengthUserNameProps)

      const error = actual.getErrorValue()
      expect(error).toBe('Text is greater than 15 chars.')
      expect(error.length).toBeGreaterThanOrEqual(15)
    })
  })
})
