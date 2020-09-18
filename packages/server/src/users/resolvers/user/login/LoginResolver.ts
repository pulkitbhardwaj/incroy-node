import { ResolverContext } from '@incroy/core'
import { User } from '../../../entities/User'
import { Resolver, Arg, Mutation, Ctx } from 'type-graphql'
import { verify } from 'argon2'
import { LoginInput } from './LoginInput'
import { UserInputError } from 'apollo-server-express'

@Resolver()
export class LoginResolver {
	@Mutation(() => User)
	async login(
		@Arg('user') { email, password }: LoginInput,
		@Ctx() { req, db }: ResolverContext,
	): Promise<User> {
		const user = await db.findOne(User, { email })

		if (!user) {
			throw new UserInputError('invalid email')
		}

		const valid = await verify(user.password, password)

		if (!valid) {
			throw new UserInputError('invalid password')
		}

		if (req.session) {
			req.session.userID = user.id
			console.log('session created yaaay')
		}

		return user
	}

	@Mutation(() => Boolean)
	logout(@Ctx() { req, res }: ResolverContext): Promise<Boolean> {
		return new Promise((resolve) => {
			req.session?.destroy((error) => {
				if (error) {
					console.error(error)
					resolve(false)
					return
				}
				res.clearCookie('qid')
				resolve(true)
			})
		})
	}
}
