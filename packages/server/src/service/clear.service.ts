// Temporary service for clearing database

import { CollectionModel, UserModel, TaskModel } from "../schema";

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
