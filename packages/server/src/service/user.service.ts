import { ApolloError } from "apollo-server-express";
import {
  UpdatePasswordInput,
  UpdateUserInput,
  UpdateAvatarInput,
  DeleteUserInput,
  RememberPasswordInput,
} from "../schema/user.schema";
import { UserModel, TaskModel, CollectionModel } from "../schema";

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

    return { message: "User updated" };
  }

  async rememberPassword(input: RememberPasswordInput) {
    const user = await UserModel.findOne({ email: input.email }).lean();

    if (!user) {
      throw new ApolloError("User not found");
    }

    const newPassword = await bcrypt.hash(input.password, 10);

    await UserModel.findByIdAndUpdate(user._id, { password: newPassword });

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
    const user = await UserModel.findById(input._id);

    if (!user) {
      throw new ApolloError("User not found");
    }

    await UserModel.deleteOne(input._id);
    await TaskModel.deleteMany({ owner: input._id }); // cannot use @pre becaues of circular dependency
    await CollectionModel.deleteMany({ owner: input._id });

    return { message: "User deleted" };
  }
}

export default UserService;
