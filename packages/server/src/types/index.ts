import { Request, Response } from "express";
import { User } from "../schema/user.schema";
import { GraphQLScalarType, Kind } from "graphql";
import { ObjectId } from "mongodb";

// Config types

export interface IContext {
  req: Request;
  res: Response;
  user: User | null;
}

// GraphQl types
export type Ref<T> = T | ObjectId;

export const ObjectIdScalar = new GraphQLScalarType({
  name: "ObjectId",
  description: "Mongo object id scalar type",
  serialize(value: unknown): string {
    if (!(value instanceof ObjectId)) {
      throw new Error("ObjectIdScalar can only serialize ObjectId values");
    }

    return value.toHexString();
  },
  parseValue(value: unknown): ObjectId {
    if (typeof value !== "string") {
      throw new Error("ObjectIdScalar can only parse string values");
    }

    return new ObjectId(value);
  },
  parseLiteral(ast): ObjectId {
    if (ast.kind !== Kind.STRING) {
      throw new Error("ObjectIdScalar can only parse string values");
    }

    return new ObjectId(ast.value);
  },
});

export interface IDeleteImageConfig {
  fileId: string;
  userId: string;
}

export type RequireAtLeastOne<T, Keys extends keyof T = keyof T> = Pick<T, Exclude<keyof T, Keys>> &
  {
    [K in Keys]-?: Required<Pick<T, K>> & Partial<Pick<T, Exclude<Keys, K>>>;
  }[Keys];
