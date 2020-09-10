import 'reflect-metadata'

import { createConnection, Connection } from 'typeorm'

import cors from 'cors'
import logger from 'morgan'
import Express, { Request, Response } from 'express'
import { createServer, Server } from 'http'

import session from 'express-session'
import IORedis, { Redis } from 'ioredis'
import connectRedis from 'connect-redis'

import { buildSchema, NonEmptyArray } from 'type-graphql'
import { ApolloServer } from 'apollo-server-express'

import Application from './Application'

export type ResolverContext = {
	req: Request
	res: Response
	session: Redis
}
class Kernel extends Application {
	public readonly router = Express()

	protected readonly sessionCache = new IORedis({
		name: 'session',
		host: 'localhost',
		port: 6379,
		db: 0,
	})

	protected server?: Server
	protected connection?: Connection
	protected schemaResolvers?: NonEmptyArray<Function>

	constructor() {
		super()
		this.useDatabase = this.useDatabase.bind(this)
		this.useCORSMiddleware = this.useCORSMiddleware.bind(this)
		this.useLoggerMiddleware = this.useLoggerMiddleware.bind(this)
		this.useSessionMiddleware = this.useSessionMiddleware.bind(this)
		this.useApolloMiddleware = this.useApolloMiddleware.bind(this)
		this.run = this.run.bind(this)
	}

	/**
	 * Initialize Kernel
	 */
	public async initialize() {
		this.useApplications()
		await this.useDatabase()
		this.useCORSMiddleware()
		this.useLoggerMiddleware()
		this.useSessionMiddleware()
		this.useMiddlewares()
		await this.useApolloMiddleware()
		this.useURLHandlers()
	}

	/**
	 * Use TypeORM database
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
	 * Use Apollo GraphQL middleware
	 */
	protected async useApolloMiddleware() {
		if (this.resolvers) {
			let [first, ...rest] = this.resolvers
			this.schemaResolvers = [first, ...rest]
			const apolloServer = new ApolloServer({
				schema: await buildSchema({
					resolvers: this.schemaResolvers,
				}),
				context: ({ req, res }) => ({ req, res, session: this.sessionCache }),
			})
			apolloServer.applyMiddleware({ app: this.router })
		}
	}

	/**
	 * Use sessions middleware
	 */
	protected useSessionMiddleware() {
		let RedisStore = connectRedis(session)

		this.router.use(
			session({
				store: new RedisStore({
					client: this.sessionCache,
				}),
				name: 'qid',
				secret: 'asdasdasdasdasdasd',
				resave: false,
				saveUninitialized: false,
				cookie: {
					httpOnly: true,
					secure: false,
					maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
				},
			}),
		)
	}

	/**
	 * Use Logger middleware
	 */
	protected useLoggerMiddleware() {
		this.router.use(logger('dev'))
	}

	/**
	 * Use CORS middleware
	 */
	protected useCORSMiddleware() {
		this.router.use(cors())
	}

	/**
	 * Run Server
	 */
	public async run() {
		await this.initialize()

		let hostname = process.env.HOST || 'localhost'
		let port = process.env.PORT ? parseInt(process.env.PORT) : 4000

		this.server = createServer(this.router)
		this.server.listen(port, hostname, () => {
			console.log(`Server running at http://${hostname}:${port}`)
		})
	}
}

export default Kernel
