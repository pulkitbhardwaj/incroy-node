import { createServer, IncomingMessage, ServerResponse } from 'http'
import express, { Express, RequestHandler } from 'express'

type route = {
	path: string
	handlers: RequestHandler[]
}

class Route {
	private static routes: route[] = []

	static get all() {
		return Route.routes
	}

	static get(path: string, ...handlers: RequestHandler[]): Route {
		Route.routes.push({ path, handlers })
		return Route
	}
}

class Kernel {
	// Express Router
	private router: Express
	private routes: route[]

	constructor() {
		this.router = express()
		this.routes = Route.all

		this.run = this.run.bind(this)
		this.getRoutes = this.getRoutes.bind(this)

		this.getRoutes()
	}

	private getRoutes() {
		this.routes.forEach((route) => {
			this.router.get(route.path, ...route.handlers)
			console.log(...route.handlers)
		})
	}

	private postRoutes() {
		this.routes.forEach((route) => {
			this.router.post(route.path, ...route.handlers)
			console.log(...route.handlers)
		})
	}

	public run(port: number = 4000, host: string = 'localhost'): void {
		createServer(this.router).listen(port, host, () => {
			console.log(`Server running on http://${host}:${port}`)
		})
	}
}

Route.get('/', (req, res) => {
	res.send('Server on top of express router')
})

new Kernel().run()
