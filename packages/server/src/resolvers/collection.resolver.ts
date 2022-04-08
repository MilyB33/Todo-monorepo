import { Arg, Authorized, Ctx, Mutation, Query, Resolver } from "type-graphql";
import {
  CreateCollectionInput,
  CollectionsResponse,
  CollectionResponse,
} from "../schema/collection.schema";
import { IContext } from "../types";
import CollectionService from "../service/collection.service";
import ImageService from "../service/image.service";

@Resolver()
export default class CollectionResolver {
  constructor(private collectionService: CollectionService, private imageService: ImageService) {
    this.collectionService = new CollectionService();
    this.imageService = new ImageService();
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
}
