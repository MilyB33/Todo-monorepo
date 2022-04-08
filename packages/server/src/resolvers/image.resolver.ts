import { Arg, Query, Resolver } from "type-graphql";
import ImageService from "../service/image.service";
import { SearchImageInput, ImageResponse } from "../schema/image.schema";

@Resolver()
export default class ImageResolver {
  constructor(private imageService: ImageService) {
    this.imageService = new ImageService();
  }

  @Query(() => ImageResponse)
  async getImages(@Arg("input") input: SearchImageInput) {
    return this.imageService.getImages({ name: input.name, path: input.path });
  }
}
