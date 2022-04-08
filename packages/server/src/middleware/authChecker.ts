import { AuthChecker } from "type-graphql";
import { IContext } from "../types";
import { ApolloError } from "apollo-server-express";
import { verifyJwt } from "../utils/jwt";
import { User } from "../schema/user.schema";

const authChecker: AuthChecker<IContext> = ({ context }) => {
  const authorization = context.req.headers.authorization;

  try {
    const token = authorization?.replace("Bearer ", "")!;
    const user = verifyJwt<User>(token);

    if (!user) {
      throw new ApolloError("Not authenticated");
    }

    context.res.locals.userId = user._id;

    return true;
  } catch (e) {
    throw new ApolloError("Not authorized");
  }
};

export default authChecker;
