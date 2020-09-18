import { URL, Application } from '@incroy/core'
import { User } from './entities/User'
import {
	UserResolver,
	LoginResolver,
	RegisterResolver,
	PasswordResolver,
} from './resolvers'

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

	resolvers = [UserResolver, LoginResolver, RegisterResolver, PasswordResolver]
}

export default new Users()
