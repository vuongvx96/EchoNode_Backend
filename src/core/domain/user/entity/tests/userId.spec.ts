import { UserId } from '../userId'
import { Result, UniqueEntityID } from '@core/common'

describe('userId', () => {
  describe('create', () => {
    it('should return success userId when give valid id', () => {
      const uniqueEntityID: UniqueEntityID  = new UniqueEntityID(
        '327312db-58a2-4b09-ad94-3be52beb697a'
      )

      const actual: Result<UserId> = UserId.create(uniqueEntityID)

      expect(actual.isSuccess).toBe(true)
      expect(actual.getValue()).toBeDefined()
      expect(actual.getValue().getStringValue()).toBe(uniqueEntityID.toValue())
      expect(actual.getValue().getValue()).toBe(uniqueEntityID)
    })

    it('should return failure userId when give invalid id', () => {
      const invalidId: UniqueEntityID = undefined

      const actual: Result<UserId> = UserId.create(invalidId)

      expect(actual.isFailure).toBe(true)
      expect(actual.getErrorValue()).toBe('value is null or undefined')
    })
  })
})
