import { Response, Request } from 'express'
import { Course } from 'src/models/Course.js'
import { coursesService } from 'src/services/coursesService.js'

export const coursesController = {
    show: async (req: Request, res: Response) => {
        const { id } = req.params

        try {
            const course = await coursesService.findByIdWithEpisodes(id)
            return res.json(course)
        } catch (err) {
            if (err instanceof Error) {
                return res.status(400).json({ message: + "O erro foi: " + err.message })
            }
        }
    },
    featured: async (req: Request, res: Response) => {
        try {
            const featuredCourses = await coursesService.getRandomFeaturedCourses()
            return res.json(featuredCourses)
        } catch (err) {
            if (err instanceof Error) {
                return res.status(400).json({ message: err.message })
            }
        }
    },
    newest: async (req: Request, res: Response) => {
        try {
            const newCourses = await coursesService.getTopNewest()
            return res.send(newCourses)
        } catch(err){
            if (err instanceof Error){
                res.status(400).json({message: err.message})
            }
        }
    }
}