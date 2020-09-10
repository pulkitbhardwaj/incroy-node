import Kernel, { URL } from '@incroy/core'
import users from './users'

class Server extends Kernel {
	urls: URL[] = [
		[
			'/',
			(_req, res) => {
				res.send('yoyo honey singh')
			},
		],
	]

	apps = [users]
}

new Server().run()
