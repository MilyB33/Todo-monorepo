import { Arg, Mutation, Resolver } from "type-graphql";
import { CreateUserInput, LoginInput, UserAuthResponse } from "../schema/user.schema";
import { OnlyMessageResponse } from "../schema/default.schema";
import AuthService from "../service/auth.service";

@Resolver()
export default class AuthResolver {
  constructor(private authService: AuthService) {
    this.authService = new AuthService();
  }

  @Mutation(() => OnlyMessageResponse)
  async register(@Arg("input") input: CreateUserInput) {
    return this.authService.register(input);
  }

  @Mutation(() => UserAuthResponse)
  async login(@Arg("input") input: LoginInput) {
    return this.authService.login(input);
  }
}
