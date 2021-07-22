const path = require('path')
 
const baseDir = path.join(__dirname, '/database')
const entitiesPath = `${baseDir}/entity/*`
const migrationPath = `${baseDir}/migration/*`
 
module.exports = {
 type: process.env.DB_CONNECTION,
 host: process.env.DB_HOST,
 port: process.env.DB_PORT,
 username: process.env.DB_USERNAME,
 password: process.env.DB_PASSWORD,
 database: process.env.DB_NAME,
 synchronize: process.env.DB_SYNCHRONIZE,
 logging: process.env.DB_LOGGING,
 entities: [entitiesPath],
 migrations: [migrationPath],
 cli: {
   migrationsDir: 'database/migration',
   entitiesPath: 'database/entity'
 }
}