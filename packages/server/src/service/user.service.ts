import { ApolloError } from "apollo-server-express";
import { UpdatePasswordInput, UserModel, UpdateUserInput } from "../schema/user.schema";
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
}

export default UserService;
