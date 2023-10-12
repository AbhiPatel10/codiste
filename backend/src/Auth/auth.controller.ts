import { Controller, Post, Body } from '@nestjs/common';
import { LoginDto } from './dtos/login.dto';
import { LoginService } from './auth.service';

@Controller('login')
export class LoginController {
  constructor(private readonly loginService: LoginService) {}

  @Post()
  async login(@Body() loginDto: LoginDto): Promise<any> {
    return this.loginService.login(loginDto);
  }
}
