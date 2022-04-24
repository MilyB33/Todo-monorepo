import UserResolver from "./user.resolver";
import CollectionResolver from "./collection.resolver";
import AuthResolver from "./auth.resolver";
import ImageResolver from "./image.resolver";
import TaskResolver from "./task.resolver";
import ClearResolver from "./clear.resolver";

export const resolvers = [
  AuthResolver,
  UserResolver,
  CollectionResolver,
  ImageResolver,
  TaskResolver,
  ClearResolver,
] as const;
