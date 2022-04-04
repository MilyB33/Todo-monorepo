import { getModelForClass, prop } from "@typegoose/typegoose";
import { Field, InputType, ObjectType } from "type-graphql";
import { ObjectIdScalar } from "../types";
import * as mongoose from "mongoose";

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
  icon: string;

  @Field(() => ObjectIdScalar)
  @prop({ required: true })
  owner: mongoose.Types.ObjectId;

  @Field(() => [ObjectIdScalar])
  @prop({ required: true })
  tasks: mongoose.Types.ObjectId[];

  @Field(() => String)
  message: string;
}

export const CollectionModel = getModelForClass<typeof Collection>(Collection);

@InputType()
export class CreateCollectionInput {
  @Field(() => String)
  name: string;

  @Field(() => String)
  color: string;

  @Field(() => String)
  icon: string;

  @Field(() => ObjectIdScalar)
  owner: mongoose.Types.ObjectId;
}

@InputType()
export class DeleteCollectionInput {
  @Field(() => String)
  _id: string;
}
