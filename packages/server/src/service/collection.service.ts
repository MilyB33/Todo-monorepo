import { ApolloError } from "apollo-server-express";
import { CreateCollectionInput, CollectionModel } from "../schema/collection.schema";
import { UserModel } from "../schema/user.schema";
import { IContext } from "../types";

class CollectionService {
  async createCollection(input: CreateCollectionInput, context: IContext) {
    const user = await UserModel.findById(context.user!._id).lean();

    if (!user) {
      throw new ApolloError("User not found");
    }

    return CollectionModel.create(input);
  }

  async getCollections(context: IContext) {
    const user = await UserModel.findById(context.user!._id).lean();

    if (!user) {
      throw new ApolloError("User not found");
    }

    console.log(user._id);

    return CollectionModel.find({ owner: user._id }).lean();
  }
}

export default CollectionService;
