import { URL, Application } from '@incroy/core'
import { User } from './entities/User'
import { UserResolver, LoginResolver, RegisterResolver } from './resolvers'

class Users extends Application {
	urls: URL[] = [
		[
			'/',
			(_req, res) => {
				res.send('yoyo honey singh')
			},
		],
	]

	entities = [User]

	resolvers = [UserResolver, LoginResolver, RegisterResolver]
}

export default new Users()
