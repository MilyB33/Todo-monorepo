import { ApolloError } from "apollo-server-express";
import { CreateCollectionInput, CollectionModel } from "../schema/collection.schema";
import { UserModel, User } from "../schema/user.schema";
import { IContext, Ref } from "../types";
import { Task, TaskModel } from "../schema/task.schema";

class CollectionService {
  async createCollection(input: CreateCollectionInput, context: IContext) {
    const user = await UserModel.findById(context.res.locals.userId).lean();

    if (!user) {
      throw new ApolloError("User not found");
    }

    const collection = await CollectionModel.create({
      ...input,
      tasks: [],
    });

    console.log(collection);

    return {
      data: { collection },
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

  async getOwner(_id: Ref<User>) {
    return await UserModel.findById(_id).lean();
  }

  async getTasks(ids: Ref<Task>[]) {
    return await TaskModel.find({ _id: { $in: ids } }).lean();
  }
}

export default CollectionService;
