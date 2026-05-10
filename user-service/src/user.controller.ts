import { Controller } from '@nestjs/common';
import { EventPattern, MessagePattern, Payload } from '@nestjs/microservices';
import { UserService } from './user.service';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @EventPattern('user.created')
  async handleUserCreated(@Payload() data: { id: string; email: string }) {
    return this.userService.createUserProfile(data);
  }

  @MessagePattern({ cmd: 'get_user_profile' })
  async getUserProfile(@Payload() id: string) {
    return this.userService.getUserProfile(id);
  }

  @MessagePattern({ cmd: 'update_user_profile' })
  async updateUserProfile(@Payload() data: { id: string; update: any }) {
    return this.userService.updateUserProfile(data.id, data.update);
  }
}
