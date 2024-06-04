import { Request, Response } from 'express'
import { AuthenticatedRequest } from 'src/middlewares/auth.js'
import { episodeService } from 'src/services/episodeService.js'

export const episodesController = {
    // GET /episodes/stream
    stream: async (req: Request, res: Response) => {
      const { videoUrl } = req.query
      const range = req.headers.range
  
      try {
        if (typeof videoUrl != 'string') {
          throw new Error('video Url precisa ser do tipo String');
        }
  
        episodeService.streamEpisodeToResponse(res, videoUrl, range)
      } catch (err) {
        if (err instanceof Error) {
          return res.status(400).json({ message: err.message })
        }
      }
    },
    getWatchTime: async (req: AuthenticatedRequest, res: Response) => {
      const episodeId = Number(req.params.id)
      const userId = req.user!.id
  
      try {
        const watchTime = await episodeService.getWatchTime(userId, episodeId)
        return res.json(watchTime)
      } catch (err) {
        if (err instanceof Error) {
          return res.status(400).json({ message: err.message })
        }
      }
    },
  
    // POST /episodes/:id/watchTime
    setWatchTime: async (req: AuthenticatedRequest, res: Response) => {
      const episodeId = Number(req.params.id)
      const userId = req.user!.id
      const { seconds } = req.body
  
      try {
        const watchTime = await episodeService.setWatchTime(userId, episodeId, seconds)
        return res.json(watchTime)
      } catch (err) {
        if (err instanceof Error) {
          return res.status(400).json({ message: err.message })
        }
      }
    }
  }