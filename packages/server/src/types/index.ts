import { Request, Response } from "express";
import { User } from "../schema/user.schema";
import { GraphQLScalarType, Kind } from "graphql";
import * as mongoose from "mongoose";

// Config types

export interface IContext {
  req: Request;
  res: Response;
  user: User | null;
}

// GraphQl types
export const ObjectIdScalar = new GraphQLScalarType({
  name: "ObjectId",
  description: "MongoDB ObjectId",
  serialize(value: unknown): string {
    if (!(value instanceof mongoose.Types.ObjectId)) {
      throw new Error("ObjectIdScalar can only serialize ObjectId values");
    }

    return value.toHexString();
  },
  parseValue(value: unknown): mongoose.Types.ObjectId {
    if (typeof value !== "string") {
      throw new Error("ObjectIdScalar can only parse string values");
    }

    return new mongoose.Types.ObjectId(value);
  },
  parseLiteral(ast): mongoose.Types.ObjectId {
    if (ast.kind !== Kind.STRING) {
      throw new Error("ObjectIdScalar can only parse string values");
    }

    return new mongoose.Types.ObjectId(ast.value);
  },
});
