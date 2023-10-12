import * as Joi from 'joi';

export class LoginDto {
  email: string;

  password: string;

  static schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  });
}
