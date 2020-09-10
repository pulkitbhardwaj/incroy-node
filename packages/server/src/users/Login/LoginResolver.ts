import { ResolverContext } from '@incroy/core'
import { User } from './../Entities/User'
import { Resolver, Query, Arg, Mutation, Ctx } from 'type-graphql'
import bcrypt from 'bcrypt'

@Resolver()
export class LoginResolver {
	@Query(() => String)
	async hello() {
		return 'hello'
	}

	@Mutation(() => User)
	async login(
		@Arg('email') email: string,
		@Arg('password') password: string,
		@Ctx() { req }: ResolverContext,
	): Promise<User | undefined> {
		const user = await User.findOne({ where: { email } })

		if (!user) {
			return undefined
		}

		const valid = bcrypt.compare(password, user.password)

		if (!valid) {
			return undefined
		}

		if (req.session) {
			req.session.userID = user.id
			console.log('session created yaaay')
		}

		return user
	}
}
