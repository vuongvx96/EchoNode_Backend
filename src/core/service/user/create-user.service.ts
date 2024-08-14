import { Result, UniqueEntityID } from '../../common'
import {
  CreateUserPort,
  CreateUserUseCase,
  User,
  UserEmail,
  UserId,
  UserName,
  UserNameProps,
  UserPassword,
  UserProps,
  UserRepositoryPort,
  UserUseCaseDto,
} from '../../domain'

export class CreateUserService implements CreateUserUseCase {
  constructor(private readonly userRepository: UserRepositoryPort) {}

  async execute(port: CreateUserPort): Promise<Result<UserUseCaseDto>> {
    try {
      const userName: Result<UserName> = UserName.create({
        name: port.username,
      })
      const userNameResult: Result<User> =
        await this.userRepository.findByUsername(port.username)
      if (userNameResult.isFailure) {
        return Result.fail<UserUseCaseDto>('Email already in used')
      }
      const userEmail: Result<UserEmail> = UserEmail.create(port.email)
      const userEmailResult: Result<User> =
        await this.userRepository.findByEmail(port.email)
      if (userEmailResult.isFailure) {
        return Result.fail<UserUseCaseDto>('Username already in used')
      }
      const userPassword: Result<UserPassword> = UserPassword.create({
        value: port.password,
      })
      const userId: Result<UserId> = UserId.create(new UniqueEntityID())

      const userProps: UserProps = {
        email: userEmail.getValue(),
        username: userName.getValue(),
        password: userPassword.getValue(),
      }

      const userResult: Result<User> = User.create(userProps)
      if (userResult.isFailure) {
        return Result.fail<UserUseCaseDto>('Failed to create a user')
      }
      const newUser = userResult.getValue()
      const newUserResult: Result<User> =
        await this.userRepository.create(newUser)
      if (newUserResult.isFailure) {
        return Result.fail<UserUseCaseDto>('Failed to saved a new user')
      }
      const savedUser = newUserResult.getValue()
      const userUseCaseDto: UserUseCaseDto = {
        id: savedUser.userId.toString(),
        username: savedUser.username.value,
        email: savedUser.email.value,
      }
      return Result.ok(userUseCaseDto)
    } 
    catch (error) {
      Result.fail<UserUseCaseDto>('Failed to connect to the DB')
    }
  }
}
