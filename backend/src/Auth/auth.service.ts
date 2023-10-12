import {
  Injectable,
  UnauthorizedException,
  ConflictException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dtos/login.dto';
import { UserService } from '../user/user.service';
import * as Joi from 'joi';
import { comparePassword } from '../utils/bcrypt';

@Injectable()
export class LoginService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async login(loginDto: LoginDto): Promise<any> {
    // Joi schema for validation
    const schema = Joi.object({
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    });

    // Validate the user object against the schema
    const { error } = schema.validate(loginDto);

    if (error) {
      throw new ConflictException('Invalid login data');
    }

    const { email, password } = loginDto;

    const user = await this.userService.findOneByEmail(email);
    if (!user) throw new UnauthorizedException('Email is not registered');
    const isPasswordMatch = await comparePassword(password, user.password);

    if (!isPasswordMatch)
      throw new UnauthorizedException('Email or credentials are incorrect');

    const payload = { sub: user._id, email: user.email };
    const jwt = await this.jwtService.signAsync(payload);

    return {
      statusCode: 200,
      accessToken: jwt,
    };
  }
}
