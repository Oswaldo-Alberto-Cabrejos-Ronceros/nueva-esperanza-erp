import type { User } from '../domain/models/User'
import type { AuthenticationService } from '../domain/services/AuthenticationService'

export class LoginClient {
  constructor(private authenticationService: AuthenticationService) {}
  async execute(email: string, password: string):Promise<User> {
    const user = await this.authenticationService.loginClient(email, password)
    return user
  }
}
