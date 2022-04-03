import {
  Arg,
  Authorized,
  Ctx,
  Mutation,
  Query,
  Resolver,
} from 'type-graphql';
import {
  CreateUserInput,
  LoginInput,
  User,
  UserWithToken,
} from '../schema/user.schema';
import UserService from '../service/user.service';
import { IContext } from '../types';

@Resolver()
export default class UserResolver {
  constructor(private userService: UserService) {
    this.userService = new UserService();
  }

  @Mutation(() => User)
  createUser(@Arg('input') input: CreateUserInput) {
    return this.userService.createUser(input);
  }

  @Mutation(() => UserWithToken)
  login(@Arg('input') input: LoginInput, @Ctx() context: IContext) {
    return this.userService.login(input, context);
  }

  @Authorized()
  @Query(() => User)
  me(@Ctx() context: IContext) {
    console.log('tak');
    return context.user;
  }
}
