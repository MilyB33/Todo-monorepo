import { getModelForClass, prop, ReturnModelType, queryMethod, pre } from "@typegoose/typegoose";
import bcrypt from "bcrypt";
import { AsQueryMethod } from "@typegoose/typegoose/lib/types";
import { IsEmail, MaxLength, MinLength } from "class-validator";
import { Field, InputType, ObjectType } from "type-graphql";
import { MessageResponse } from "./default.schema";
import { ObjectIdScalar } from "../types";
import { ObjectId } from "mongodb";

function findByEmail(this: ReturnModelType<typeof User, QueryHelpers>, email: User["email"]) {
  return this.findOne({ email });
}

interface QueryHelpers {
  findByEmail: AsQueryMethod<typeof findByEmail>;
}

@pre<User>("save", async function () {
  if (!this.isModified("password")) return;

  const salt = await bcrypt.genSalt(10);

  const hash = await bcrypt.hashSync(this.password, salt);

  this.password = hash;
})
@ObjectType()
@queryMethod(findByEmail)
export class User {
  @Field()
  readonly _id: ObjectId;

  @Field(() => String)
  @prop({ required: true })
  name: string;

  @Field(() => String)
  @prop({ required: true })
  surname: string;

  @Field(() => String)
  @prop({ required: true })
  email: string;

  @Field(() => String)
  @prop({ required: true, default: "https://ik.imagekit.io/eucxsqj51hzu/default/profile" })
  avatar: string;

  @prop({ required: true })
  password: string;
}

@ObjectType()
export class Auth {
  @Field(() => User, { nullable: true })
  user?: User;

  @Field(() => String, { nullable: true })
  token?: string;
}

@ObjectType()
export class UserAuthResponse extends MessageResponse<Auth>(Auth) {}

@ObjectType()
export class UserResponse extends MessageResponse<User>(User) {}

export const UserModel = getModelForClass<typeof User, QueryHelpers>(User);

@InputType()
export class CreateUserInput {
  @Field(() => String)
  name: string;

  @Field(() => String)
  surname: string;

  @IsEmail()
  @Field(() => String)
  email: string;

  @MinLength(8, {
    message: "Password must be at least 8 characters long",
  })
  @MaxLength(20, {
    message: "Password must be at most 20 characters long",
  })
  @Field(() => String)
  password: string;
}

@InputType()
export class LoginInput {
  @Field(() => String)
  email: string;

  @Field(() => String)
  password: string;
}

@InputType()
export class UpdatePasswordInput {
  @Field(() => ObjectIdScalar)
  _id: ObjectId;

  @Field(() => String)
  password: string;

  @Field(() => String)
  newPassword: string;
}

@InputType()
export class UpdateUserInput {
  @Field(() => ObjectIdScalar)
  _id: ObjectId;

  @Field(() => String, { nullable: true })
  name?: string;

  @Field(() => String, { nullable: true })
  surname?: string;

  @Field(() => String, { nullable: true })
  email?: string;
}
