import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { ProductService } from './product.service';

@Controller()
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @MessagePattern({ cmd: 'create_product' })
  async create(@Payload() data: any) {
    return this.productService.create(data);
  }

  @MessagePattern({ cmd: 'get_products' })
  async findAll(@Payload() query: any) {
    return this.productService.findAll(query);
  }

  @MessagePattern({ cmd: 'get_product' })
  async findOne(@Payload() id: string) {
    return this.productService.findOne(id);
  }

  @MessagePattern({ cmd: 'update_product' })
  async update(@Payload() data: { id: string; update: any }) {
    return this.productService.update(data.id, data.update);
  }

  @MessagePattern({ cmd: 'delete_product' })
  async delete(@Payload() id: string) {
    return this.productService.delete(id);
  }
}
