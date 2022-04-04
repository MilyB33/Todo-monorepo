import { Arg, Ctx, Mutation, Query, Resolver } from "type-graphql";
import { CreateUserInput, LoginInput, User, UserWithToken } from "../schema/user.schema";
import { ReturnType } from "../schema/default.schema";
import UserService from "../service/user.service";
import { IContext } from "../types";

@Resolver()
export default class UserResolver {
  constructor(private userService: UserService) {
    this.userService = new UserService();
  }

  @Mutation(() => ReturnType)
  createUser(@Arg("input") input: CreateUserInput) {
    return this.userService.createUser(input);
  }

  @Mutation(() => UserWithToken)
  login(@Arg("input") input: LoginInput) {
    return this.userService.login(input);
  }

  @Query(() => User)
  me(@Ctx() context: IContext) {
    return context.user;
  }
}
