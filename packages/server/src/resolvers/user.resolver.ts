import { Arg, Authorized, Ctx, Mutation, Query, Resolver } from "type-graphql";
import { User } from "../schema/user.schema";
import UserService from "../service/user.service";
import { IContext } from "../types";
import { UpdatePasswordInput, UserResponse, UpdateUserInput } from "../schema/user.schema";
import { OnlyMessageResponse } from "../schema/default.schema";

@Resolver()
export default class UserResolver {
  constructor(private userService: UserService) {
    this.userService = new UserService();
  }

  @Authorized()
  @Mutation(() => OnlyMessageResponse)
  updatePassword(@Arg("input") input: UpdatePasswordInput) {
    return this.userService.updatePassword(input);
  }

  @Authorized()
  @Mutation(() => UserResponse)
  updateUser(@Arg("input") input: UpdateUserInput) {
    return this.userService.updateUser(input);
  }

  @Authorized()
  @Query(() => User)
  me(@Ctx() context: IContext) {
    return context.user;
  }
}
