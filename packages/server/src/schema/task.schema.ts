import { getModelForClass, prop } from "@typegoose/typegoose";
import { Field, InputType, ObjectType } from "type-graphql";
import { ObjectIdScalar, Ref } from "../types";
import { ObjectId } from "mongodb";
import { MessageResponse } from "./default.schema";
import { User } from "./user.schema";

@ObjectType()
export class Task {
  @Field(() => ObjectIdScalar)
  readonly _id: ObjectId;

  @Field(() => String)
  @prop({ required: true })
  description: string;

  @Field(() => String)
  @prop({ required: true })
  date: string;

  @Field(() => Boolean)
  @prop({ required: true })
  completed: boolean;

  @Field(() => User)
  @prop({ ref: User, required: true })
  owner: Ref<User>;
}

@ObjectType()
export class Tasks {
  @Field(() => [Task]!, { nullable: true })
  tasks: Task[];
}

@ObjectType()
export class OneTask {
  @Field(() => Task, { nullable: true })
  task: Task;
}

@ObjectType()
export class TaskResponse extends MessageResponse<OneTask>(OneTask) {}

@ObjectType()
export class TasksResponse extends MessageResponse<Tasks>(Tasks) {}

export const TaskModel = getModelForClass<typeof Task>(Task);

@InputType()
export class CreateTaskInput {
  @Field(() => String)
  description: string;

  @Field(() => String)
  date: string;

  @Field(() => ObjectIdScalar)
  collectionId: ObjectId;
}

@InputType()
export class UpdateTaskInput {
  @Field(() => ObjectIdScalar)
  _id: ObjectId;

  @Field(() => String, { nullable: true })
  description?: string;

  @Field(() => String, { nullable: true })
  date?: string;

  @Field(() => Boolean, { nullable: true })
  completed?: boolean;
}

@InputType()
export class TaskIDInput {
  @Field(() => ObjectIdScalar)
  _id: ObjectId;
}
