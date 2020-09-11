import 'reflect-metadata'

let host = process.env.DB_HOST || 'localhost'
let port = process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 5433
let dbName = process.env.DB_NAME || 'hiring-test'
let user = process.env.DB_USER || 'postgres'
let password = process.env.DB_PASS || 'root'

export default {
	migrations: {
		tableName: '__migrations__', // name of database table with log of executed transactions
		path: './migrations', // path to the folder with migrations
		pattern: /^[\w-]+\d+\.[tj]s$/, // regex pattern for the migration files
		dropTables: true, // allow to disable table dropping
		emit: 'js', // migration generation mode
	},
	type: 'postgresql', // one of `mongo` | `mysql` | `mariadb` | `postgresql` | `sqlite`
	dbName,
	host,
	port,
	user,
	password,
	entities: ['./lib/**/Entities/*.js'], // path to your JS entities (dist), relative to `baseDir`
	entitiesTs: ['./src/**/Entities/*.ts'],
	debug: true,
}
