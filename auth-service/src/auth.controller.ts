import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { AuthService } from './auth.service';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @MessagePattern({ cmd: 'register' })
  async register(@Payload() data: any) {
    return this.authService.register(data);
  }

  @MessagePattern({ cmd: 'login' })
  async login(@Payload() data: any) {
    return this.authService.login(data);
  }

  @MessagePattern({ cmd: 'validate_token' })
  async validateToken(@Payload() data: any) {
    // If we want the API Gateway to validate token by calling Auth Service
    // In our plan, API Gateway validates JWT directly, but we provide this just in case.
    try {
      return this.authService.validateUser(data);
    } catch (e) {
      return null;
    }
  }
}
