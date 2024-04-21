import express from 'express'
import {database} from './database'
const app = express()

const PORT = process.env.PORT || 3000


app.listen(PORT, () =>{
    database.authenticate().then(() =>{
        console.log('DB connection succesful')
    })
    console.log(`Server succesfully started at port ${PORT}`)
})