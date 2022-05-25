// process.env["NODE_CONFIG_DIR"] = __dirname + "/../../config"; // this is needed in build but crashes in dev
import "reflect-metadata";
import dotenv from "dotenv";
dotenv.config();
import config from "config";
import express from "express";
import { buildSchema } from "type-graphql";
import { ApolloServer } from "apollo-server-express";
import {
  ApolloServerPluginLandingPageGraphQLPlayground,
  ApolloServerPluginLandingPageProductionDefault,
} from "apollo-server-core";
import cookieParser from "cookie-parser";
import path from "path";
import { connectToMongo } from "./utils/mongo";
import { resolvers } from "./resolvers";
import { IContext } from "./types";
import authChecker from "./middleware/authChecker";
import { TypegooseMiddleware } from "./middleware/typegoose";
import { ObjectId } from "mongodb";
import { ObjectIdScalar } from "./types";

(async () => {
  const schema = await buildSchema({
    resolvers,
    authChecker,
    authMode: "null",
    emitSchemaFile: path.resolve(__dirname, "schema.gql"),
    globalMiddlewares: [TypegooseMiddleware],
    scalarsMap: [{ type: ObjectId, scalar: ObjectIdScalar }],
    // validate: false,
  });

  // init express server
  const app = express();

  app.use(cookieParser());

  // create the apollo server
  const server = new ApolloServer({
    schema,
    context: (ctx: IContext) => ctx,
    plugins: [
      process.env.NODE_ENV === "production"
        ? ApolloServerPluginLandingPageProductionDefault()
        : ApolloServerPluginLandingPageGraphQLPlayground(),
    ],
  });

  await server.start();

  // apply middleware to server

  server.applyMiddleware({
    app,
    path: "/api/graphql",
    bodyParserConfig: {
      limit: "50mb",
    },
  });

  const port = config.get("port");

  app.listen({ port }, () => {
    console.log(`Apollo Server on http://localhost:${port}/api/graphql`);
  });

  connectToMongo();
})();
