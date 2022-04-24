// Temporary service for clearing database

import { CollectionModel } from "../schema/collection.schema";
import { UserModel } from "../schema/user.schema";
import { TaskModel } from "../schema/task.schema";

class ClearService {
  async clear() {
    await CollectionModel.deleteMany({});
    await TaskModel.deleteMany({});

    return {
      message: "Database cleared",
    };
  }

  async clearUsers() {
    await UserModel.deleteMany({});

    return {
      message: "Users cleared",
    };
  }
}

export default ClearService;
