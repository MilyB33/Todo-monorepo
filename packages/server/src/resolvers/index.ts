import UserResolver from "./user.resolver";
import CollectionResolver from "./collection.resolver";

export const resolvers = [UserResolver, CollectionResolver] as const;
