import { AuthChecker } from "type-graphql";
import { IContext } from "../types";
import { ApolloError } from "apollo-server-express";

const authChecker: AuthChecker<IContext> = ({ context }) => {
  if (!context.user)
    throw new ApolloError("You are not authorized to perform this action", "UNAUTHORIZED");
  else return true;
};

export default authChecker;
