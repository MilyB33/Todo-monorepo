import { ApolloError } from "apollo-server-express";
import bcrypt from "bcrypt";
import { CreateUserInput, LoginInput, UserModel } from "../schema/user.schema";
import { IContext } from "../types";
import { signJwt } from "../utils/jwt";

class UserService {
  async createUser(input: CreateUserInput) {
    let user = await UserModel.find().findByEmail(input.email);

    if (user) {
      throw new ApolloError("User already exists");
    }

    user = await UserModel.find().findByUsername(input.username);

    if (user) {
      throw new ApolloError("Username is already taken");
    }

    UserModel.create(input);

    return { message: "User created" };
  }

  async login(input: LoginInput) {
    const user = await UserModel.find().findByEmail(input.email).lean();

    if (!user) {
      throw new ApolloError("User not found");
    }

    const passwordIsValid = await bcrypt.compare(input.password, user.password);

    if (!passwordIsValid) {
      throw new ApolloError("Invalid password");
    }

    const token = signJwt(user);

    return {
      ...user,
      token,
      message: "User logged in",
    };
  }
}

export default UserService;
