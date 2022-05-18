import { ApolloError } from "apollo-server-express";
import {
  CreateCollectionInput,
  CollectionIDInput,
  UpdateCollectionInput,
} from "../schema/collection.schema";
import { User } from "../schema/user.schema";
import { IContext, Ref } from "../types";
import { Task } from "../schema/task.schema";
import { CollectionModel, TaskModel, UserModel } from "../schema";

class CollectionService {
  async createCollection(input: CreateCollectionInput, context: IContext) {
    const user = await UserModel.findById(context.res.locals.userId).lean();

    if (!user) {
      throw new ApolloError("User not found");
    }

    const collection = await CollectionModel.create({
      ...input,
      owner: user._id,
      tasks: [],
    });

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

  async deleteCollection(input: CollectionIDInput) {
    const collection = await CollectionModel.findById(input._id).lean();

    if (!collection) {
      throw new ApolloError("Collection not found");
    }

    await TaskModel.deleteMany({ collectionId: input._id });

    await CollectionModel.deleteOne({ _id: input._id });

    return {
      data: { collection },
      message: "Collection deleted",
    };
  }

  async updateCollection(input: UpdateCollectionInput) {
    const collection = await CollectionModel.findById(input._id).lean();

    if (!collection) {
      throw new ApolloError("Collection not found");
    }

    const updatedCollection = await CollectionModel.findByIdAndUpdate(
      input._id,
      {
        ...input,
      },
      { new: true }
    ).lean();

    return {
      data: { collection: updatedCollection },
      message: "Collection updated",
    };
  }

  async getOwner(_id: Ref<User>) {
    return await UserModel.findById(_id).lean();
  }

  async getTasks(ids: Ref<Task>[]) {
    const tasks = await TaskModel.find({ _id: { $in: ids } }).lean();
    tasks.sort((a, b) => (new Date(a.date) < new Date(b.date) ? 1 : -1));
    return tasks;
  }
}

export default CollectionService;
