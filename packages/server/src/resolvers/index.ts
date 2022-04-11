import UserResolver from "./user.resolver";
import CollectionResolver from "./collection.resolver";
import AuthResolver from "./auth.resolver";
import ImageResolver from "./image.resolver";
import TaskResolver from "./task.resolver";

export const resolvers = [
  AuthResolver,
  UserResolver,
  CollectionResolver,
  ImageResolver,
  TaskResolver,
] as const;
