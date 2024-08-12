import { Entity, UniqueEntityID } from '../entity'

export abstract class AggregateRoot<T> extends Entity<T> {
  get id(): UniqueEntityID {
    return this._id
  }
}
