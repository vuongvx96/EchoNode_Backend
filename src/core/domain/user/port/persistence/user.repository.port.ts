import { Result } from '../../../../common'
import { User } from '../../entity/user'

export interface UserRepositoryPort {
  findById(id: string): Promise<Result<User>>
  findByEmail(email: string): Promise<Result<User>>
  create(user: User): Promise<Result<User>>
}
