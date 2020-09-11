import { UserResolver } from './UserResolver'
import { RegisterResolver } from './Register/RegisterResolver'
import { LoginResolver } from './Login/LoginResolver'
import { User } from './Entities/User'
import { URL, Application } from '@incroy/core'

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
