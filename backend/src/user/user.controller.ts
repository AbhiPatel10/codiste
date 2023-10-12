// user.controller.ts
import {
  Controller,
  Body,
  Get,
  Param,
  BadRequestException,
  Post,
  Put,
  Delete,
} from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.entity';
class UserResponseDto {
  data: User;
  message: string;
  statusCode: number;
}
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async create(@Body() user: User): Promise<User> {
    try {
      return this.userService.create(user);
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw new BadRequestException('Invalid input');
      }
      throw error;
    }
  }

  @Get()
  async findAll(): Promise<User[]> {
    try {
      return await this.userService.findAll();
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw new BadRequestException('Invalid input');
      }
      throw error;
    }
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() userDto: User): Promise<User> {
    try {
      return await this.userService.update(id, userDto);
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw new BadRequestException('Invalid input');
      }
      throw error;
    }
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<UserResponseDto> {
    try {
      const deletedUser = await this.userService.delete(id);
      return {
        data: deletedUser,
        message: 'User deleted successfully',
        statusCode: 200,
      };
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw new BadRequestException('Invalid input');
      }
      throw error;
    }
  }
}
