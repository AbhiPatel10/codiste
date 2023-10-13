import {
  Injectable,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { User } from './user.schema';
import * as Joi from 'joi';
import { ResponseService } from '../common/global-exception.filter';
import { encodePassword } from '../utils/bcrypt';
import { JwtService } from '@nestjs/jwt';

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
    private readonly responseService: ResponseService,
    private readonly jwtService: JwtService,
  ) {}
  async findOneByEmail(email: string): Promise<User> {
    const findUser = await this.userModel.findOne({ email: email }).exec();
    return findUser;
  }
  async create(user: User): Promise<User> {
    await UserValidation(user);
    // Check if the email is already in use
    const existingUser = await this.findOneByEmail(user.email);
    if (existingUser) {
      throw new ConflictException('Email is already in use');
    }
    // password encoding using bcrypt
    const password = encodePassword(user.password);
    const createdUser = new this.userModel({ ...user, password });
    const data = await createdUser.save();
    return this.responseService.responseHandler(
      200,
      'User Created Successfully',
      data,
    );
  }

  async findAll(): Promise<User[]> {
    const data = await this.userModel.find().exec();
    return this.responseService.responseHandler(
      200,
      'Fetched User Data Successfully',
      data,
    );
  }

  async update(id: string, userData: User): Promise<User> {
    let updateddata: any;
    if (!Types.ObjectId.isValid(id)) {
      // Handle invalid ObjectId error
      throw new ConflictException('Invalid ObjectId format');
    }
    await UserValidation(userData);
    const findUser = await this.userModel.findOne({ _id: id }).exec();

    if (findUser.password != userData.password) {
      const password = await encodePassword(userData.password);
      updateddata = { ...userData, password };
    } else {
      updateddata = userData;
    }
    const updatedUser = await this.userModel.findByIdAndUpdate(
      id,
      updateddata,
      {
        new: true,
      },
    );
    if (!updatedUser) throw new NotFoundException('User not found');
    return this.responseService.responseHandler(
      200,
      'Update User Data Successfully',
      updatedUser,
    );
  }

  async delete(id: string): Promise<User> {
    if (!Types.ObjectId.isValid(id)) {
      // Handle invalid ObjectId error
      throw new ConflictException('Invalid ObjectId format');
    }
    const deletedUser = await this.userModel.findByIdAndDelete(id);
    if (!deletedUser) throw new NotFoundException('User not found');
    return this.responseService.responseHandler(
      200,
      'Delete User Data Successfully',
      deletedUser,
    );
  }
  async getProfile(authToken: string): Promise<User> {
    // Verify the JWT token
    const decodedToken = await this.jwtService.verify(authToken);
    // Extract the user id from the token
    const userId = decodedToken.sub;
    const user = await this.userModel.findById(userId);
    if (!user) throw new NotFoundException('User not found');

    return this.responseService.responseHandler(
      200,
      'Profile data fetch Successfully',
      user,
    );
  }
}
