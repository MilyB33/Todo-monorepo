import { Arg, Authorized, Ctx, Mutation, Query, Resolver } from "type-graphql";
import { CreateCollectionInput, Collection } from "../schema/collection.schema";
import { IContext } from "../types";
import CollectionService from "../service/collection.service";

@Resolver()
export default class CollectionResolver {
  constructor(private collectionService: CollectionService) {
    this.collectionService = new CollectionService();
  }

  @Authorized()
  @Mutation(() => Collection)
  createCollection(@Arg("input") input: CreateCollectionInput, @Ctx() context: IContext) {
    return this.collectionService.createCollection(input, context);
  }

  @Authorized()
  @Query(() => [Collection])
  getCollections(@Ctx() context: IContext) {
    console.log("Tak");
    return this.collectionService.getCollections(context);
  }
}
