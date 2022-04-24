import { Arg, Authorized, Ctx, FieldResolver, Mutation, Query, Resolver, Root } from "type-graphql";
import {
  CreateCollectionInput,
  CollectionsResponse,
  CollectionResponse,
  Collection,
  CollectionIDInput,
  UpdateCollectionInput,
} from "../schema/collection.schema";
import { OnlyMessageResponse } from "../schema/default.schema";
import { IContext } from "../types";
import CollectionService from "../service/collection.service";

@Resolver(() => Collection)
export default class CollectionResolver {
  constructor(private collectionService: CollectionService) {
    this.collectionService = new CollectionService();
  }

  @Authorized()
  @Mutation(() => CollectionResponse)
  async createCollection(@Arg("input") input: CreateCollectionInput, @Ctx() context: IContext) {
    return this.collectionService.createCollection(input, context);
  }

  @Authorized()
  @Query(() => CollectionsResponse)
  async getCollections(@Ctx() context: IContext) {
    return this.collectionService.getCollections(context);
  }

  @Authorized()
  @Mutation(() => OnlyMessageResponse)
  async deleteCollection(@Arg("input") input: CollectionIDInput) {
    return this.collectionService.deleteCollection(input);
  }

  @Authorized()
  @Mutation(() => CollectionResponse)
  async updateCollection(@Arg("input") input: UpdateCollectionInput) {
    return this.collectionService.updateCollection(input);
  }

  @FieldResolver()
  async owner(@Root() collection: Collection) {
    return this.collectionService.getOwner(collection.owner);
  }

  @FieldResolver()
  async tasks(@Root() collection: Collection) {
    return await this.collectionService.getTasks(collection.tasks);
  }
}
