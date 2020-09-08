import { PathParams } from 'express-serve-static-core'
import { RequestHandler, Router, Handler } from 'express'
import { EntitySchema } from 'typeorm'

export type URL = [PathParams, Application] | [PathParams, ...RequestHandler[]]

interface Application {
	readonly router: Router
	urls?: URL[]
	middlewares?: Handler[]
	resolvers?: Function[]
	entities?: (Function | EntitySchema<any>)[]
	apps?: Application[]
	readonly initialize: () => Promise<void>
}

class Application {
	// Express Router
	public readonly router = Router()

	// Initialize Router
	public readonly initialize = async () => {
		this.useApplications()
		console.log('init app')
		await this.useMiddlewares()
		this.useURLHandlers()
	}

	/**
	 * Add Applications
	 */
	protected readonly useApplications = () => {
		console.log(this.apps)
		this.apps?.forEach(({ resolvers, entities, initialize }) => {
			initialize()
			if (resolvers) {
				if (this.resolvers) {
					this.resolvers = this.resolvers.concat(resolvers)
				} else {
					this.resolvers = resolvers
				}
			}
			if (entities) {
				if (this.entities) {
					this.entities = this.entities.concat(entities)
				} else {
					this.entities = entities
				}
			}
		})
	}

	// Register Router middlewares
	protected readonly useMiddlewares = async () => {
		this.middlewares?.forEach((middleware) => {
			Array.isArray(middleware)
				? this.router.use(...middleware)
				: this.router.use(middleware)
		})
	}

	// Register Router urls
	protected readonly useURLHandlers = () => {
		this.urls?.forEach(([path, handler]: URL) => {
			if (handler instanceof Application) {
				this.router.use(path, handler.router)
			} else if (Array.isArray(handler)) {
				this.router.all(path, ...handler)
			} else {
				this.router.all(path, handler)
			}
		})
	}
}

export default Application
