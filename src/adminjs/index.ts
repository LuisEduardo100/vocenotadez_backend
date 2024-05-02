import AdminJS from 'adminjs'
import AdminJsExpress from '@adminjs/express'
import AdminJsSequelize from '@adminjs/sequelize'
import {database} from '../database/index.js'
import { adminJsResources } from './resources/index.js'



AdminJS.registerAdapter(AdminJsSequelize)

export const adminJs = new AdminJS({
    databases: [database],
    rootPath: '/admin',
    resources: adminJsResources,
    branding: {
        companyName: 'VoceNotaDez',
        logo: '/vocenotadez.svg',
        // // theme: {
        //     colors: {
        //         primary100: '#ff0043',
        //         primary80: '#ff1a57',
        //         primary60: '#ff3369',
        //         primary40: '#ff4d7c',
        //         primary20: '#ff668f',
        //         grey100: '#151515',
        //         grey80: '#333333',
        //         grey60: '#4d4d4d',
        //         grey40: '#666666',
        //         grey20: '#dddddd',
        //         filterBg: '#F7F7E8',
        //         accent: '#F7F7E8',
        //         hoverBg: '#F7F7E8',
        //     }
        // }
    }
})

export const adminJsRouter = AdminJsExpress.buildRouter(adminJs)