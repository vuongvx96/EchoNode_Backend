import { Result } from '@core/common'

import { UserEmail } from '../user-email'

describe('userEmail', () => {
  describe('create', () => {
    it('should return success UserEmail result when given a valid email', () => {
      const validEmail: string = 'khoanguyen@gmail.com'

      const actual: Result<UserEmail> = UserEmail.create(validEmail)

      expect(actual.isSuccess).toBe(true)
      expect(actual.getValue()).toBeInstanceOf(UserEmail)
      expect(actual.getValue().value).toBe(validEmail)
    })

    it('should return failure UserEmail result when given a invalid email', () => {
      const invalidEmail: string = 'khanguyengmail.com'

      const actual: Result<UserEmail> = UserEmail.create(invalidEmail)

      expect(actual.isFailure).toBe(true)
      expect(actual.getErrorValue()).toBe('Email address not valid')
    })
  })
})
