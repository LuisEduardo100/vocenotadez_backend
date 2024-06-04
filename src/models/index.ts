import { Category } from './Category.js'
import { Course } from './Course.js'
import { Episode } from './Episode.js'
import { Favorite } from './Favorite.js'
import { Like } from './Like.js'
import { User } from './User.js'
import { WatchTime } from './WatchTime.js'

Category.hasMany(Course)

Course.belongsTo(Category)
Course.hasMany(Episode)
Course.belongsToMany(User, { through: Favorite })
Course.belongsToMany(User, { through: Like })
Course.hasMany(Favorite, { as: 'favoritesUsers', foreignKey: 'courseId' })

Episode.belongsTo(Course)
Episode.belongsToMany(User, { through: WatchTime })

Favorite.belongsTo(Course)
Favorite.belongsTo(User)

User.belongsToMany(Course, { through: Favorite })
User.belongsToMany(Course, { through: Like })
User.belongsToMany(Episode, { through: WatchTime })
User.hasMany(Favorite, { as: 'favoritesCourses', foreignKey: 'UserId' })

export {
  Category,
  Course,
  Episode,
  Favorite,
  Like,
  User,
  WatchTime
}