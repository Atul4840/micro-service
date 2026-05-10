import { Injectable, Inject, UnauthorizedException, BadRequestException } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { JwtService } from '@nestjs/jwt';
import { ClientProxy } from '@nestjs/microservices';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
    @Inject('USER_SERVICE') private userClient: ClientProxy,
  ) {}

  async register(data: any) {
    const existing = await this.prisma.userAuth.findUnique({
      where: { email: data.email },
    });
    if (existing) {
      throw new BadRequestException('Email already exists');
    }

    const hashedPassword = await bcrypt.hash(data.password, 10);
    const user = await this.prisma.userAuth.create({
      data: {
        email: data.email,
        password: hashedPassword,
      },
    });

    // Emit event for user-service to create user profile
    this.userClient.emit('user.created', {
      id: user.id,
      email: user.email,
    });

    return {
      message: 'User registered successfully',
      userId: user.id,
    };
  }

  async login(data: any) {
    const user = await this.prisma.userAuth.findUnique({
      where: { email: data.email },
    });

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isPasswordValid = await bcrypt.compare(data.password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = { sub: user.id, email: user.email, role: user.role };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async validateUser(payload: any) {
    return await this.prisma.userAuth.findUnique({
      where: { id: payload.sub },
    });
  }
}
