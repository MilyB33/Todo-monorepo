import { ObjectType, Field, InputType } from "type-graphql";
import { ListFileResponse } from "imagekit/dist/libs/interfaces";
import { MessageResponse } from "./default.schema";

@ObjectType()
export class Image implements ListFileResponse {
  @Field(() => String)
  fileId: string;

  @Field(() => String)
  type: "file" | "folder";

  @Field(() => String)
  name: string;

  @Field(() => String)
  createdAt: string;

  @Field(() => String)
  filePath: string;

  @Field(() => [String], { nullable: true })
  tags: string[];

  @Field(() => Boolean)
  isPrivateFile: boolean;

  @Field(() => String, { nullable: true })
  customCoordinates: string;

  @Field(() => String)
  url: string;

  @Field(() => String)
  thumbnail: string;

  @Field()
  fileType: "all" | "image" | "non-image";
}

@ObjectType()
export class Images {
  @Field(() => [Image])
  images: Image[];
}

@ObjectType()
export class ImageResponse extends MessageResponse<Images>(Images) {}

@InputType()
export class SearchImageInput {
  @Field(() => String, { nullable: true })
  name?: string;

  @Field(() => String, { nullable: true })
  path?: string;
}
