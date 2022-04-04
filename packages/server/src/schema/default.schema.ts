import { Field, ObjectType } from "type-graphql";

@ObjectType()
export class ReturnType {
  @Field(() => String)
  message: string;
}
