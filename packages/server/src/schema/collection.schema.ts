import { getModelForClass, prop } from "@typegoose/typegoose";
import { Field, InputType, ObjectType } from "type-graphql";
import { ObjectIdScalar } from "../types";
import { ObjectId } from "mongodb";
import { MessageResponse } from "./default.schema";

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

  @Field(() => ObjectIdScalar)
  @prop({ required: true })
  owner: ObjectId;

  @Field(() => [ObjectIdScalar], { nullable: true })
  @prop({ required: true })
  tasks: ObjectId[];
}

@ObjectType()
export class Collections {
  @Field(() => [Collection]!, { nullable: true })
  collections: Collection[];
}

@ObjectType()
export class CollectionResponse extends MessageResponse<Collection>(Collection) {}

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
