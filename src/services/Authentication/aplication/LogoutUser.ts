import type { AuthenticationService } from '../domain/services/AuthenticationService'

export class LogoutUser {
  constructor(private authenticationService: AuthenticationService) {}
  async execute() {
    await this.authenticationService.logout()
  }
}
