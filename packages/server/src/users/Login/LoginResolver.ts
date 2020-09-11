import { ResolverContext } from '@incroy/core'
import { User } from './../Entities/User'
import { Resolver, Arg, Mutation, Ctx } from 'type-graphql'
import { verify } from 'argon2'

@Resolver()
export class LoginResolver {
	@Mutation(() => User)
	async login(
		@Arg('email') email: string,
		@Arg('password') password: string,
		@Ctx() { req, db }: ResolverContext,
	): Promise<User> {
		const user = await db.findOne(User, { email })

		if (!user) {
			throw new Error('invalid email')
		}

		const valid = await verify(user.password, password)

		if (!valid) {
			throw new Error('invalid password')
		}

		if (req.session) {
			req.session.userID = user.id
			console.log('session created yaaay')
		}

		return user
	}
}
