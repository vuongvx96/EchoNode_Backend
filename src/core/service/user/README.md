# Project Name ReadMe

## CreateUserService

The purpose of the CreateUserService is to create a new user with a unique email and username. If the username, email, or password are already in use, the service should return a Result.fail response to indicate that the user cannot be created due to validation issues.

### Constraints

- User's email must be unique.
- User's username must be unique.

### Response

If the user cannot be created due to validation issues or failed when calling repository, the service will return a Result.fail response.