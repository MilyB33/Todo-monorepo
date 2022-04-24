import { Mutation, Resolver } from "type-graphql";
import { OnlyMessageResponse } from "../schema/default.schema";
import ClearService from "../service/clear.service";

@Resolver()
export default class ClearResolver {
  constructor(private clearService: ClearService) {
    this.clearService = new ClearService();
  }

  @Mutation(() => OnlyMessageResponse)
  async clear() {
    return this.clearService.clear();
  }

  @Mutation(() => OnlyMessageResponse)
  async clearUsers() {
    return this.clearService.clearUsers();
  }
}
