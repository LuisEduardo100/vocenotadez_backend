import { Episode } from 'src/models/Episode.js'
import { Course } from '../models/Course.js'

export const coursesService = {
    findByIdWithEpisodes: async (id: string) => {
        const courseWithEpisodes = await Course.findByPk(id, {
            attributes: ['id', 'name', 'synopsis', ['thumbnail_url', 'thumbnailUrl']],
            include: {
                model: Episode,
                as: 'Episodes',
                attributes: [
                    'id',
                    'name',
                    'synopsis',
                    'order',
                    ['video_url', 'videoUrl'],
                    ['seconds_long', 'secondsLong']
                ],
                order: [['order', 'ASC']],
                separate: true
            }
        })

        return courseWithEpisodes
    },
    getRandomFeaturedCourses: async () => {
        const featuredCourses = await Course.findAll({
            attributes: ['id', 'name', 'synopsis', ['thumbnail_url', 'thumbnailUrl']],
            where: { featured: true }
        })

        const randomFeaturedCourses = featuredCourses.sort(() => 0.5 - Math.random())

        return randomFeaturedCourses.slice(0, 3)
    },
    getTopNewest: async () => {
        const courses = await Course.findAll({
            limit: 10,
            order: [['created_at', 'DESC']]
        })

        return courses
    }
}