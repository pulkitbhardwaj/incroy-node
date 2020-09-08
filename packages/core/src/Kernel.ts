import 'reflect-metadata'
import { createServer } from 'http'
import { buildSchema, NonEmptyArray } from 'type-graphql'
import express, { Express } from 'express'
import logger from 'morgan'
import { ApolloServer } from 'apollo-server-express'
import cors from 'cors'
import Application from './Application'
import { createConnection, Connection } from 'typeorm'

interface Kernel extends Application {
	readonly router: Express
}

class Kernel extends Application {
	protected connection?: Connection
	protected schemaResolvers?: NonEmptyArray<Function>

	/**
	 * Express Kernel Router
	 */
	public readonly router = express()

	constructor() {
		super()
		this.useDatabase = this.useDatabase.bind(this)
		this.useApolloMiddleware = this.useApolloMiddleware.bind(this)
		this.run = this.run.bind(this)
	}

	/**
	 * Initialize Kernel
	 */
	public async initialize() {
		this.useApplications()
		await this.useDatabase()
		this.useExpressMiddlewares()
		this.useMiddlewares()
		await this.useApolloMiddleware()
		this.useURLHandlers()
	}

	/**
	 * Create PostgreSQL Pool
	 */
	protected async useDatabase() {
		let host = process.env.DB_HOST || 'localhost'
		let port = process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 5433
		let database = process.env.DB_NAME || 'hiring-test'
		let username = process.env.DB_USER || 'postgres'
		let password = process.env.DB_PASS || 'root'

		this.connection = await createConnection({
			type: 'postgres',
			host,
			port,
			database,
			username,
			password,
			entities: this.entities,
			synchronize: true,
			logging: true,
		})
	}

	/**
	 * Add Apollo GraphQL middleware
	 */
	protected async useApolloMiddleware() {
		if (this.resolvers) {
			let [first, ...rest] = this.resolvers
			this.schemaResolvers = [first, ...rest]
			const apolloServer = new ApolloServer({
				schema: await buildSchema({
					resolvers: this.schemaResolvers,
					validate: false,
				}),
				context: ({ req, res }) => ({ req, res }),
			})
			apolloServer.applyMiddleware({ app: this.router })
		}
	}

	/**
	 * Add basic Express middlewares
	 */
	protected useExpressMiddlewares() {
		this.router.use(logger('dev'))
		this.router.use(cors())
		// this.router.use(session())
	}

	/**
	 * Run Server
	 */
	public async run() {
		await this.initialize()

		let hostname = process.env.HOST || 'localhost'
		let port = process.env.PORT ? parseInt(process.env.PORT) : 4000

		return createServer(this.router).listen(port, hostname, () => {
			console.log(`Server running at http://${hostname}:${port}`)
		})
	}
}

export default Kernel
