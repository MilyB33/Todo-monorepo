import { getModelForClass, prop } from "@typegoose/typegoose";
import { Field, InputType, ObjectType } from "type-graphql";
import { ObjectIdScalar, Ref } from "../types";
import { User } from "./user.schema";
import { ObjectId } from "mongodb";
import { MessageResponse } from "./default.schema";
import { Task } from "./task.schema";

@ObjectType()
export class Collection {
  @Field(() => String)
  readonly _id: string;

  @Field(() => String)
  @prop({ required: true })
  name: string;

  @Field(() => String)
  @prop({ required: true })
  color: string;

  @Field(() => String)
  @prop({ required: true })
  iconUrl: string;

  @Field(() => User)
  @prop({ ref: User, required: true })
  owner: Ref<User>;

  @Field(() => [Task], { nullable: true })
  @prop({ ref: Task, required: false, default: [] })
  tasks: Ref<Task>[];
}

@ObjectType()
export class Collections {
  @Field(() => [Collection]!, { nullable: true })
  collections: Collection[];
}

@ObjectType()
export class OneCollection {
  @Field(() => Collection, { nullable: true })
  collection: Collection;
}

@ObjectType()
export class CollectionResponse extends MessageResponse<OneCollection>(OneCollection) {}

@ObjectType()
export class CollectionsResponse extends MessageResponse<Collections>(Collections) {}

export const CollectionModel = getModelForClass<typeof Collection>(Collection);

@InputType()
export class CreateCollectionInput {
  @Field(() => String)
  name: string;

  @Field(() => String)
  color: string;

  @Field(() => String)
  iconUrl: string;

  @Field(() => ObjectIdScalar)
  owner: ObjectId;
}

@InputType()
export class DeleteCollectionInput {
  @Field(() => String)
  _id: string;
}
