import { ApolloError } from "apollo-server-express";
import { CreateCollectionInput, CollectionModel } from "../schema/collection.schema";
import { UserModel } from "../schema/user.schema";
import { IContext } from "../types";

class CollectionService {
  async createCollection(input: CreateCollectionInput, context: IContext) {
    const user = await UserModel.findById(context.res.locals.userId).lean();

    if (!user) {
      throw new ApolloError("User not found");
    }

    const collection = CollectionModel.create({
      ...input,
      tasks: [],
    });

    return {
      data: collection,
      message: "Collection created",
    };
  }

  async getCollections(context: IContext) {
    const user = await UserModel.findById(context.res.locals.userId).lean();

    if (!user) {
      throw new ApolloError("User not found");
    }

    const collections = await CollectionModel.find({ owner: user._id }).lean();

    return {
      data: { collections },
      message: "Collections found",
    };
  }
}

export default CollectionService;
