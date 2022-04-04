import dotenv from "dotenv";
dotenv.config();
import "reflect-metadata";
import express from "express";
import { buildSchema } from "type-graphql";
import { ApolloServer } from "apollo-server-express";
import {
  ApolloServerPluginLandingPageGraphQLPlayground,
  ApolloServerPluginLandingPageProductionDefault,
} from "apollo-server-core";
import cookieParser from "cookie-parser";

import { connectToMongo } from "./utils/mongo";
import { resolvers } from "./resolvers";
import { verifyJwt } from "./utils/jwt";
import { User } from "./schema/user.schema";
import config from "config";
import { IContext } from "./types";
import authChecker from "./utils/authChecker";

(async () => {
  const schema = await buildSchema({
    resolvers,
    authChecker,
    authMode: "null",
  });

  // init express server
  const app = express();

  app.use(cookieParser());

  // create the apollo server
  const server = new ApolloServer({
    schema,
    context: (ctx: IContext) => {
      const context = ctx;

      const token = ctx.req.headers.authorization || "";

      if (token.length > 0) {
        const user = verifyJwt<User>(token.split(" ")[1]);
        context.user = user;
      }

      return context;
    },
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
  });

  const port = config.get("port");

  app.listen({ port }, () => {
    console.log(`Apollo Server on http://localhost:${port}/api/graphql`);
  });

  connectToMongo();
})();
