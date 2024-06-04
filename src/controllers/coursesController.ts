import { Response, Request } from 'express'
import { getPaginationParams } from 'src/helpers/getPaginationParams.js'
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
        } catch (err) {
            if (err instanceof Error) {
                res.status(400).json({ message: err.message })
            }
        }
    },
    search: async (req: Request, res: Response) => {
        const { name } = req.query
        const [page, perPage] = getPaginationParams(req.query)
        try {
            // Nada que não for uma string não passará do if pois lançará um erro
            if (typeof name != 'string') throw new Error('Parâmetro nome precisa ser uma string')
            const courses = await coursesService.findByName(name, page, perPage)
            return res.json(courses)
        } catch (err) {
            if (err instanceof Error) {
                res.status(400).json({ message: err.message })
            }
        }
    },
    popular: async (req: Request, res: Response) => {
        try {
            const topTen = await coursesService.getTopTenByLikes()
            return res.json(topTen)
        } catch (err) {
            if (err instanceof Error) {
                return res.status(400).json({ message: err.message })
            }
        }
    },
}