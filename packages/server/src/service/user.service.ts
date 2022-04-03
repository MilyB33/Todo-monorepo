import { ApolloError } from 'apollo-server-express';
import bcrypt from 'bcrypt';
import {
  CreateUserInput,
  LoginInput,
  UserModel,
} from '../schema/user.schema';
import { IContext } from '../types';
import { signJwt } from '../utils/jwt';

class UserService {
  async createUser(input: CreateUserInput) {
    return UserModel.create(input);
  }

  async login(input: LoginInput, context: IContext) {
    const user = await UserModel.find()
      .findByEmail(input.email)
      .lean();

    if (!user) {
      throw new ApolloError('User not found');
    }

    const passwordIsValid = await bcrypt.compare(
      input.password,
      user.password
    );

    if (!passwordIsValid) {
      throw new ApolloError('Invalid password');
    }

    const token = signJwt(user);

    context.res.cookie('accessToken', token, {
      maxAge: 3.154e10, // 1 year
      httpOnly: true,
      domain: 'localhost',
      path: '/',
      sameSite: 'strict',
      secure: process.env.NODE_ENV === 'production',
    });

    return {
      ...user,
      token,
    };
  }
}

export default UserService;
