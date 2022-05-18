import { getModelForClass } from "@typegoose/typegoose";
import { User, QueryHelpers } from "./user.schema";
import { Collection } from "./collection.schema";
import { Task } from "./task.schema";

export const UserModel = getModelForClass<typeof User, QueryHelpers>(User);
export const CollectionModel = getModelForClass<typeof Collection>(Collection);
export const TaskModel = getModelForClass<typeof Task>(Task);
