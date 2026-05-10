import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async createUserProfile(data: { id: string; email: string }) {
    return this.prisma.userProfile.create({
      data: {
        id: data.id,
        email: data.email,
      },
    });
  }

  async getUserProfile(id: string) {
    const user = await this.prisma.userProfile.findUnique({
      where: { id },
    });
    if (!user) {
      throw new NotFoundException('User profile not found');
    }
    return user;
  }

  async updateUserProfile(id: string, data: any) {
    return this.prisma.userProfile.update({
      where: { id },
      data,
    });
  }
}
