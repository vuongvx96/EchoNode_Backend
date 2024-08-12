import { Result } from '../../common'
import {
  CreateUserPort,
  CreateUserUseCase,
  UserRepositoryPort,
  UserUseCaseDto,
} from '../../domain'

export class CreateUserService implements CreateUserUseCase {
  constructor(private readonly userRepository: UserRepositoryPort) {}

  async execute(port: CreateUserPort): Promise<Result<UserUseCaseDto>> {
    throw new Error('Method not implemented.')
  }
}
