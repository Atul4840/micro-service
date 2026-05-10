import { Controller, Get, Post, Body, Param, Inject, UseGuards, Put, Delete, Query } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { JwtAuthGuard } from './jwt-auth.guard';

@Controller('api')
export class AppController {
  constructor(
    @Inject('AUTH_SERVICE') private readonly authClient: ClientProxy,
    @Inject('USER_SERVICE') private readonly userClient: ClientProxy,
    @Inject('PRODUCT_SERVICE') private readonly productClient: ClientProxy,
  ) {}

  // --- Auth Routes ---
  @Post('auth/register')
  async register(@Body() data: any) {
    return firstValueFrom(this.authClient.send({ cmd: 'register' }, data));
  }

  @Post('auth/login')
  async login(@Body() data: any) {
    return firstValueFrom(this.authClient.send({ cmd: 'login' }, data));
  }

  // --- User Routes ---
  @UseGuards(JwtAuthGuard)
  @Get('users/:id')
  async getUser(@Param('id') id: string) {
    return firstValueFrom(this.userClient.send({ cmd: 'get_user_profile' }, id));
  }

  @UseGuards(JwtAuthGuard)
  @Put('users/:id')
  async updateUser(@Param('id') id: string, @Body() update: any) {
    return firstValueFrom(this.userClient.send({ cmd: 'update_user_profile' }, { id, update }));
  }

  // --- Product Routes ---
  @Get('products')
  async getProducts(@Query() query: any) {
    return firstValueFrom(this.productClient.send({ cmd: 'get_products' }, query));
  }

  @Get('products/:id')
  async getProduct(@Param('id') id: string) {
    return firstValueFrom(this.productClient.send({ cmd: 'get_product' }, id));
  }

  @UseGuards(JwtAuthGuard)
  @Post('products')
  async createProduct(@Body() data: any) {
    return firstValueFrom(this.productClient.send({ cmd: 'create_product' }, data));
  }

  @UseGuards(JwtAuthGuard)
  @Put('products/:id')
  async updateProduct(@Param('id') id: string, @Body() update: any) {
    return firstValueFrom(this.productClient.send({ cmd: 'update_product' }, { id, update }));
  }

  @UseGuards(JwtAuthGuard)
  @Delete('products/:id')
  async deleteProduct(@Param('id') id: string) {
    return firstValueFrom(this.productClient.send({ cmd: 'delete_product' }, id));
  }
}
