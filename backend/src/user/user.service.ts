import {
  Injectable,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { User } from './user.entity';
import * as Joi from 'joi';

const UserValidation = (user: User) => {
  // Joi schema for validation
  const schema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    mobileNumber: Joi.string().required(),
    password: Joi.string().required(),
  });

  // Validate the user object against the schema
  const { error } = schema.validate(user);

  if (error) {
    throw new ConflictException('Invalid user data');
  }
};

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
  ) {}

  async create(user: User): Promise<User> {
    await UserValidation(user);
    // Check if the email is already in use
    const existingUser = await this.userModel
      .findOne({ email: user.email })
      .exec();
    if (existingUser) {
      throw new ConflictException('Email is already in use');
    }
    const createdUser = new this.userModel(user);
    return createdUser.save();
  }

  async findAll(): Promise<User[]> {
    try {
      return await this.userModel.find().exec();
    } catch (error) {
      throw new NotFoundException('Failed to fetch users');
    }
  }

  async update(id: string, userData: User): Promise<User> {
    try {
      if (!Types.ObjectId.isValid(id)) {
        // Handle invalid ObjectId error
        throw new ConflictException('Invalid ObjectId format');
      }
      await UserValidation(userData);

      const updatedUser = await this.userModel.findByIdAndUpdate(id, userData, {
        new: true,
      });
      if (!updatedUser) {
        throw new NotFoundException('User not found');
      }
      return updatedUser;
    } catch (error) {
      throw error;
    }
  }

  async delete(id: string): Promise<User> {
    try {
      if (!Types.ObjectId.isValid(id)) {
        // Handle invalid ObjectId error
        throw new ConflictException('Invalid ObjectId format');
      }
      const deletedUser = await this.userModel.findByIdAndDelete(id);
      if (!deletedUser) {
        throw new NotFoundException('User not found');
      }
      return deletedUser;
    } catch (error) {
      throw error;
    }
  }
}
