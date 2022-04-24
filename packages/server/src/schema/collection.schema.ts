import { getModelForClass, prop } from "@typegoose/typegoose";
import { Field, InputType, ObjectType } from "type-graphql";
import { ObjectIdScalar, Ref } from "../types";
import { User } from "./user.schema";
import { ObjectId } from "mongodb";
import { MessageResponse } from "./default.schema";
import { Task } from "./task.schema";

@ObjectType()
export class Collection {
  @Field(() => ObjectIdScalar)
  readonly _id: ObjectId;

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

  @Field(() => Boolean)
  @prop({ required: true, default: false })
  isFavorite: boolean;
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

  @Field(() => Boolean, { nullable: true })
  isFavorite?: boolean;
}

@InputType()
export class CollectionIDInput {
  @Field(() => ObjectIdScalar)
  _id: ObjectId;
}

@InputType()
export class UpdateCollectionInput {
  @Field(() => ObjectIdScalar)
  _id: ObjectId;

  @Field(() => String, { nullable: true })
  name?: string;

  @Field(() => String, { nullable: true })
  color?: string;

  @Field(() => String, { nullable: true })
  iconUrl?: string;

  @Field(() => Boolean, { nullable: true })
  isFavorite?: boolean;
}
