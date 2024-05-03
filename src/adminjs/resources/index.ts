import { ResourceWithOptions } from "adminjs";
import { Category } from "../../models/Category.js";
import { Course } from "../../models/Course.js";
import { Episode } from "../../models/Episode.js"
import { categoryResourceOptions } from "./category.js";
import { courseResourceOptions, courseResourceFeatures } from "./course.js";
import { episodeResourceFeatures, episodeResourceOptions } from "./episode.js";

export const adminJsResources: ResourceWithOptions[] = [
  {
    resource: Course,
    options: courseResourceOptions,
    features: courseResourceFeatures
  },
  {
    resource: Category,
    options: categoryResourceOptions
  },
  {
    resource: Episode,
    options: episodeResourceOptions,
    features: episodeResourceFeatures
  }
]