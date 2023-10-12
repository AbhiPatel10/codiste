import {
  Controller,
  Body,
  Get,
  Param,
  Post,
  Put,
  Delete,
} from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.schema';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async create(@Body() user: User): Promise<User> {
    return this.userService.create(user);
  }

  @Get()
  async findAll(): Promise<User[]> {
    return await this.userService.findAll();
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() userDto: User): Promise<User> {
    return await this.userService.update(id, userDto);
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<User> {
    return await this.userService.delete(id);
  }

  @Get('profile/:id')
  async Profile(@Param('id') id: string): Promise<User> {
    return await this.userService.getProfile(id);
  }
}
