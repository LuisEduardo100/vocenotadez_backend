import {Sequelize} from 'sequelize'

export const database = new Sequelize({
    dialect: 'postgres',
    host: 'localhost',
    port: 5432,
    database: 'vocenotadez_development',
    username: 'vocenotadez',
    password: 'vocenotadez',
    define: {
        underscored: true
    }
})