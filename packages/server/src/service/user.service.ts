import { ApolloError } from "apollo-server-express";
import {
  UpdatePasswordInput,
  UserModel,
  UpdateUserInput,
  UpdateAvatarInput,
  DeleteUserInput,
} from "../schema/user.schema";

import bcrypt from "bcrypt";

class UserService {
  async updatePassword(input: UpdatePasswordInput) {
    const user = await UserModel.findById(input._id).lean();

    if (!user) {
      throw new ApolloError("User not found");
    }

    const passwordIsValid = await bcrypt.compare(input.password, user.password);

    if (!passwordIsValid) {
      throw new ApolloError("Invalid password");
    }

    const newPassword = await bcrypt.hash(input.newPassword, 10);

    await UserModel.findByIdAndUpdate(input._id, { password: newPassword });

    return { message: "User updated", data: {} };
  }

  async updateUser(input: UpdateUserInput) {
    const user = await UserModel.findById(input._id).lean();

    if (!user) {
      throw new ApolloError("User not found");
    }

    const updatedUser = await UserModel.findByIdAndUpdate(
      input._id,
      {
        ...input,
      },
      { new: true }
    ).lean();

    return { data: updatedUser, message: "User updated" };
  }

  async updateAvatar(input: UpdateAvatarInput) {
    const user = await UserModel.findById(input._id).lean();

    if (!user) {
      throw new ApolloError("User not found");
    }

    const updatedUser = await UserModel.findByIdAndUpdate(
      input._id,
      {
        ...input,
      },
      { new: true }
    ).lean();

    return { data: updatedUser, message: "User updated" };
  }

  async deleteUser(input: DeleteUserInput) {
    const user = await UserModel.findById(input._id).lean();

    if (!user) {
      throw new ApolloError("User not found");
    }

    await UserModel.findByIdAndDelete(input._id);

    return { message: "User deleted" };
  }
}

export default UserService;
