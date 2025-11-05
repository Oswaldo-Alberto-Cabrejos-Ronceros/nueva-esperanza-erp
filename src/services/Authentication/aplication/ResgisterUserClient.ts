import type { UserClientRequest } from '../domain/models/User'
import type { AuthenticationService } from '../domain/services/AuthenticationService'

export class RegisterUserClient {
  constructor(private authenticationService: AuthenticationService) {}

  async execute(userClient: UserClientRequest) {
    const userAuth = await this.authenticationService.register(userClient)

    return userAuth
  }
}
