import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './login.dto';
import { UserService } from 'src/user/user.service';
import { User } from 'src/user/user.entity';

@Injectable()
export class LoginService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const existingUser = await this.userService.findOneByEmail(email: string);
    if (
      existingUser &&
      (await bcrypt.compare(password, existingUser.password))
    ) {
      const result = { ...existingUser };
      delete result.password; // Remove password from the result
      return result;
    }

    return null;
  }

  async login(loginDto: LoginDto): Promise<any> {
    try {
      const { email, password } = loginDto;

      const user = await this.validateUser(email, password);

      if (!user) {
        throw new UnauthorizedException('Invalid credentials');
      }

      const payload = { sub: user._id, email: user.email };
      return {
        access_token: this.jwtService.sign(payload),
      };
    } catch (error) {
      throw error;
    }
  }
}
