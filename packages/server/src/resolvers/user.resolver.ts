import { Arg, Authorized, Ctx, Mutation, Query, Resolver } from "type-graphql";
import { User } from "../schema/user.schema";
import UserService from "../service/user.service";
import ImageService from "../service/image.service";
import { IContext } from "../types";
import {
  UpdatePasswordInput,
  UserResponse,
  UpdateUserInput,
  AvatarResponse,
  UpdateAvatarInput,
  DeleteUserInput,
} from "../schema/user.schema";
import { OnlyMessageResponse } from "../schema/default.schema";
import { ApolloError } from "apollo-server-express";

@Resolver()
export default class UserResolver {
  constructor(private userService: UserService, private imageService: ImageService) {
    this.userService = new UserService();
    this.imageService = new ImageService();
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
  @Mutation(() => AvatarResponse)
  async updateAvatar(@Arg("input") input: UpdateAvatarInput) {
    const avatarUrl = await this.imageService.uploadImage({
      file: input.avatar,
      fileName: `${input._id}`,
      folder: `profile/${input._id}`,
      customMetadata: {
        type: "profile",
      },
    });

    if (!avatarUrl) {
      throw new ApolloError("Error uploading avatar");
    }

    return this.userService.updateAvatar({
      _id: input._id,
      avatar: avatarUrl.url,
    });
  }

  @Authorized()
  @Mutation(() => OnlyMessageResponse)
  async deleteUser(@Arg("input") input: DeleteUserInput) {
    // this.imageService.deleteFolder(`profile/${input._id}`);
    return this.userService.deleteUser(input);
  }

  @Authorized()
  @Query(() => User)
  me(@Ctx() context: IContext) {
    return context.user;
  }
}
