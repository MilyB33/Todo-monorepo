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

function findByUsername(
  this: ReturnModelType<typeof User, QueryHelpers>,
  username: User["username"]
) {
  return this.findOne({ username });
}

interface QueryHelpers {
  findByEmail: AsQueryMethod<typeof findByEmail>;
  findByUsername: AsQueryMethod<typeof findByUsername>;
}

@pre<User>("save", async function () {
  if (!this.isModified("password")) return;

  const salt = await bcrypt.genSalt(10);

  const hash = await bcrypt.hashSync(this.password, salt);

  this.password = hash;
})
@ObjectType()
@queryMethod(findByEmail)
@queryMethod(findByUsername)
export class User {
  @Field(() => ObjectIdScalar)
  readonly _id: ObjectId;

  @Field(() => String)
  @prop({ required: true })
  username: string;

  @Field(() => String)
  @prop({ required: true })
  email: string;

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

export const UserModel = getModelForClass<typeof User, QueryHelpers>(User);

@InputType()
export class CreateUserInput {
  @Field(() => String)
  username: string;

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

// @InputType()
// export class UpdateUserInput {
//   @Field(() => String)
//   _id: string;

//   @Field(() => String)
//   username?: string;

//   @IsEmail()
//   @Field(() => String)
//   email?: string;

//   @MinLength(8, {
//     message: "Password must be at least 8 characters long",
//   })
//   @MaxLength(20, {
//     message: "Password must be at most 20 characters long",
//   })
//   @Field(() => String)
//   password?: string;
// }

@InputType()
export class UpdatePasswordInput {
  @Field(() => ObjectIdScalar)
  _id: ObjectId;

  @Field(() => String)
  password: string;

  @Field(() => String)
  newPassword: string;
}
