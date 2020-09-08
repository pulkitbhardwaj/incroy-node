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

	// Express App Router
	public readonly router = express()

	// Initialize Express Router
	public readonly initialize = async () => {
		console.log('init kernel')
		this.useApplications()
		await this.useDatabase()
		this.useExpressMiddlewares()
		await this.useMiddlewares()
		await this.useApolloMiddleware()
		this.useURLHandlers()
	}

	/**
	 * Create PostgreSQL Pool
	 */
	protected readonly useDatabase = async () => {
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
			synchronize: true,
			entities: this.entities,
		})
	}

	/**
	 * Add Apollo GraphQL middleware
	 */
	protected readonly useApolloMiddleware = async () => {
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
	protected readonly useExpressMiddlewares = async () => {
		this.router.use(logger('dev'))
		this.router.use(cors())
		// this.router.use(session())
	}

	/**
	 * Run Server
	 */
	protected readonly run = async () => {
		await this.initialize()

		let hostname = process.env.HOST || 'localhost'
		let port = process.env.PORT ? parseInt(process.env.PORT) : 4000

		return createServer(this.router).listen(port, hostname, () => {
			console.log(`Server running at http://${hostname}:${port}`)
		})
	}
}

export default Kernel
