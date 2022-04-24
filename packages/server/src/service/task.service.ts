import { ApolloError } from "apollo-server-express";
import { IContext, Ref } from "../types";
import { TaskModel, UpdateTaskInput } from "../schema/task.schema";
import { CreateTaskInput, TaskIDInput } from "../schema/task.schema";
import { UserModel, User } from "../schema/user.schema";
import { CollectionModel } from "../schema/collection.schema";

class TaskService {
  async createTask(input: CreateTaskInput, context: IContext) {
    const task = new TaskModel(input);

    task.owner = context.res.locals.userId;
    task.completed = false;

    await task.save();

    await CollectionModel.updateOne(
      { _id: input.collectionId, owner: context.res.locals.userId },
      { $push: { tasks: task._id } }
    );

    return {
      message: "Task created successfully",
      data: { task },
    };
  }

  async getTasks(context: IContext) {
    return TaskModel.find({ owner: context.res.locals.userId });
  }

  async getTask(input: TaskIDInput, context: IContext) {
    const task = await TaskModel.findOne({ _id: input._id, owner: context.res.locals.userId });

    if (!task) {
      throw new ApolloError("Error retrieving task");
    }

    return {
      message: "Task retrieved successfully",
      data: { task },
    };
  }

  async updateTask(input: UpdateTaskInput, context: IContext) {
    const task = await TaskModel.findOneAndUpdate(
      { _id: input._id, owner: context.res.locals.userId },
      {
        $set: {
          description: input.description,
          date: input.date,
          completed: input.completed,
        },
      },
      { new: true }
    );

    if (!task) {
      throw new ApolloError("Error updating task");
    }

    return {
      message: "Task updated successfully",
      data: { task },
    };
  }

  async deleteTask(input: TaskIDInput, context: IContext) {
    const task = await TaskModel.findOne({ _id: input._id, owner: context.res.locals.userId });

    if (!task) {
      throw new ApolloError("Task not found");
    }

    await CollectionModel.updateOne(
      { _id: task.collectionId, owner: context.res.locals.userId },
      { $pull: { tasks: task._id } }
    );

    await TaskModel.deleteOne({ _id: input._id, owner: context.res.locals.userId });

    return {
      message: "Task deleted successfully",
    };
  }

  async getOwner(_id: Ref<User>) {
    return UserModel.findOne({ _id });
  }
}

export default TaskService;
