import { Arg, Authorized, Ctx, FieldResolver, Mutation, Query, Resolver, Root } from "type-graphql";
import {
  Task,
  TaskResponse,
  TasksResponse,
  CreateTaskInput,
  TaskIDInput,
  UpdateTaskInput,
} from "../schema/task.schema";
import { IContext } from "../types";
import TaskService from "../service/task.service";

@Resolver(() => Task)
export default class TaskResolver {
  constructor(private taskService: TaskService) {
    this.taskService = new TaskService();
  }

  @Authorized()
  @Mutation(() => TaskResponse)
  async createTask(@Arg("input") input: CreateTaskInput, @Ctx() context: IContext) {
    return this.taskService.createTask(input, context);
  }

  @Authorized()
  @Query(() => TasksResponse)
  async getTasks(@Ctx() context: IContext) {
    return this.taskService.getTasks(context);
  }

  @Authorized()
  @Query(() => TaskResponse)
  async getTask(@Arg("input") input: TaskIDInput, @Ctx() context: IContext) {
    return this.taskService.getTask(input, context);
  }

  @Authorized()
  @Mutation(() => TaskResponse)
  async updateTask(@Arg("input") input: UpdateTaskInput, @Ctx() context: IContext) {
    return this.taskService.updateTask(input, context);
  }

  @Authorized()
  @Mutation(() => TaskResponse)
  async deleteTask(@Arg("input") input: TaskIDInput, @Ctx() context: IContext) {
    return this.taskService.deleteTask(input, context);
  }

  @FieldResolver()
  async owner(@Root() task: Task) {
    return this.taskService.getOwner(task.owner);
  }
}
