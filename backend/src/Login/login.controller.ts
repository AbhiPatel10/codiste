import { Controller, Post, Body, BadRequestException } from '@nestjs/common';
import { LoginDto } from './login.dto';
import { LoginService } from './login.service';

@Controller('login')
export class LoginController {
  constructor(private readonly loginService: LoginService) {}

  @Post()
  async login(@Body() loginDto: LoginDto): Promise<any> {
    try {
      return this.loginService.login(loginDto);
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw new BadRequestException('Invalid input');
      }
      throw error;
    }
  }
}
