import type { AuthenticationService } from '../domain/services/AuthenticationService'

export class LoginEmployee {
  constructor(private authenticationService: AuthenticationService) {}
  async execute(email: string, password: string) {
    const user = await this.authenticationService.loginEmployee(email, password)
    return user
  }
}
