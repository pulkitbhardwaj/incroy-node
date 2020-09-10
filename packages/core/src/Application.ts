import { PathParams } from 'express-serve-static-core'
import { RequestHandler, Router, Handler } from 'express'
import { EntitySchema } from 'typeorm'

export type URL = [PathParams, Application] | [PathParams, ...RequestHandler[]]

class Application {
	public readonly router = Router()

	public urls?: URL[]
	public middlewares?: Handler[]
	public resolvers?: Function[]
	public entities?: (Function | EntitySchema<any>)[]
	public apps?: Application[]

	constructor() {
		this.initialize = this.initialize.bind(this)
		this.useApplications = this.useApplications.bind(this)
		this.useMiddlewares = this.useMiddlewares.bind(this)
		this.useURLHandlers = this.useURLHandlers.bind(this)
	}

	/**
	 * Initialize Application
	 */
	public initialize() {
		this.useApplications()
		this.useMiddlewares()
		this.useURLHandlers()
	}

	/**
	 * Add Applications
	 */
	protected useApplications() {
		this.apps?.forEach((app) => {
			app.initialize()

			if (app.resolvers) {
				if (this.resolvers) {
					this.resolvers = this.resolvers.concat(app.resolvers)
				} else {
					this.resolvers = app.resolvers
				}
			}

			if (app.entities) {
				if (this.entities) {
					this.entities = this.entities.concat(app.entities)
				} else {
					this.entities = app.entities
				}
			}
		})
	}

	/**
	 * Register Router middlewares
	 */
	protected useMiddlewares() {
		this.middlewares?.forEach((middleware) => {
			Array.isArray(middleware)
				? this.router.use(...middleware)
				: this.router.use(middleware)
		})
	}

	/**
	 * Register Router urls
	 */
	protected useURLHandlers() {
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
