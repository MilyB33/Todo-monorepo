import {
  getModelForClass,
  prop,
  ReturnModelType,
  queryMethod,
  pre,
} from '@typegoose/typegoose';
import bcrypt from 'bcrypt';
import { AsQueryMethod } from '@typegoose/typegoose/lib/types';
import { IsEmail, MaxLength, MinLength } from 'class-validator';
import { Field, InputType, ObjectType } from 'type-graphql';

function findByEmail(
  this: ReturnModelType<typeof User, QueryHelpers>,
  email: User['email']
) {
  return this.findOne({ email });
}

interface QueryHelpers {
  findByEmail: AsQueryMethod<typeof findByEmail>;
}

@pre<User>('save', async function () {
  if (!this.isModified('password')) return;

  const salt = await bcrypt.genSalt(10);

  const hash = await bcrypt.hashSync(this.password, salt);

  this.password = hash;
})
@ObjectType()
@queryMethod(findByEmail)
export class User {
  @Field(() => String)
  _id: string;

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
export class UserWithToken extends User {
  @Field(() => String)
  token: string;
}

export const UserModel = getModelForClass<typeof User, QueryHelpers>(
  User
);

@InputType()
export class CreateUserInput {
  @Field(() => String)
  username: string;

  @IsEmail()
  @Field(() => String)
  email: string;

  @MinLength(8, {
    message: 'Password must be at least 8 characters long',
  })
  @MaxLength(20, {
    message: 'Password must be at most 20 characters long',
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
