import { ApolloError } from "apollo-server-express";
import bcrypt from "bcrypt";
import { signJwt } from "../utils/jwt";
import { CreateUserInput, LoginInput, UserModel } from "../schema/user.schema";
import { IContext } from "../types";

class AuthService {
  async register(input: CreateUserInput) {
    let user = await UserModel.find().findByEmail(input.email);

    if (user) {
      throw new ApolloError("User already exists");
    }

    UserModel.create(input);

    return { message: "User created", data: {} };
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

    const token = signJwt({
      _id: user._id,
      email: user.email,
      name: user.name,
      surname: user.surname,
    });

    return {
      data: {
        user,
        token,
      },
      message: "User logged in",
    };
  }

  async me(context: IContext) {
    const user = await UserModel.findById(context.res.locals.userId).lean();

    if (!user) {
      throw new ApolloError("User not found");
    }

    const token = signJwt({
      _id: user._id,
      email: user.email,
      name: user.name,
      surname: user.surname,
    });

    return {
      data: {
        user: {
          _id: user._id,
          email: user.email,
          name: user.name,
          surname: user.surname,
        },
        token,
      },
      message: "User logged in",
    };
  }
}

export default AuthService;
