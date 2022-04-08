import { ClassType, Field, ObjectType } from "type-graphql";

export function MessageResponse<TData>(FieldValue: ClassType<TData>) {
  @ObjectType({ isAbstract: true })
  abstract class MessageResponseClass {
    @Field(() => FieldValue, { nullable: true })
    data?: TData;

    @Field(() => String)
    message: string;
  }

  return MessageResponseClass;
}

@ObjectType()
export class OnlyMessageResponse {
  @Field(() => String)
  message: string;
}
