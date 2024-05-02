import { ResourceWithOptions } from "adminjs";
import { Category } from "../../models/Category.js";
import { Course } from "../../models/Course.js";
import { categoryResourceOptions } from "./category.js";
import { courseResourceOptions } from "./course.js";

export const adminJsResources: ResourceWithOptions[] = [
  {
    resource: Course,
    options: courseResourceOptions
  },
  {
    resource: Category,
    options: categoryResourceOptions
  },
]