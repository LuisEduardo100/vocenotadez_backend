import express from 'express'
import {database} from './database/index.js'
import { adminJs, adminJsRouter } from './adminjs/index.js'


const app = express()
const PORT = process.env.PORT || 3000

app.use(express.static('public'))

app.use(adminJs.options.rootPath, adminJsRouter)

app.listen(PORT, () =>{
    database.authenticate().then(() =>{
        console.log('DB connection succesful')
    })
    console.log(`Server succesfully started at port ${PORT}`)
})