import { Result, UseCase } from '../../../common'
import { CreateUserPort } from '../port/usecase'
import { UserUseCaseDto } from './dto/user-usecase.dto'

export interface CreateUserUseCase
  extends UseCase<CreateUserPort, Result<UserUseCaseDto>> {}
