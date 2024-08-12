import { Result, UseCase } from '../../../common'
import { GetUserPort } from '../port/usecase'
import { UserUseCaseDto } from './dto/user-usecase.dto'

export interface GetUserUseCase
  extends UseCase<GetUserPort, Result<UserUseCaseDto>> {}
