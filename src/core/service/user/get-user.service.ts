import { Result } from '../../common'
import {
  GetUserPort,
  GetUserUseCase,
  UserRepositoryPort,
  UserUseCaseDto,
} from '../../domain'

export class GetUserService implements GetUserUseCase {
  constructor(private readonly userRepository: UserRepositoryPort) {}

  async execute(port: GetUserPort): Promise<Result<UserUseCaseDto>> {
    throw new Error('Method not implemented.')
  }
}
