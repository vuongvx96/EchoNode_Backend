import { Result } from '../../common'
import {
  GetUserPort,
  GetUserUseCase,
  User,
  UserRepositoryPort,
  UserUseCaseDto,
} from '../../domain'

export class GetUserService implements GetUserUseCase {
  constructor(private readonly userRepository: UserRepositoryPort) {}

  async execute(port: GetUserPort): Promise<Result<UserUseCaseDto>> {
    try {
      const userResult: Result<User> = await this.userRepository.findById(
        port.userId
      )
      if (userResult.isFailure) {
        return Result.fail('Error')
      }

      const user = userResult.getValue()
      const userUseCaseDto: UserUseCaseDto = {
        id: user.id.toString(),
        username: user.username.value,
        email: user.email.value,
      }

      return Result.ok(userUseCaseDto)
    } catch (error) {
      return Result.fail('Unknown error')
    }
  }
}
