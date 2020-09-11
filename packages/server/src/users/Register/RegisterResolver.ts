import { ResolverContext } from '@incroy/core'
import { User } from './../Entities/User'
import { Resolver, Query, Arg, Mutation, Ctx } from 'type-graphql'
import { hash } from 'argon2'

@Resolver()
export class RegisterResolver {
	@Query(() => String)
	async yo() {
		return 'yo'
	}

	@Mutation(() => User)
	async register(
		@Arg('firstName') firstName: string,
		@Arg('lastName') lastName: string,
		@Arg('email') email: string,
		@Arg('password') password: string,
		@Ctx() { req, db }: ResolverContext,
	): Promise<User | undefined> {
		let user, hashedPassword

		try {
			hashedPassword = await hash(password)

			user = db.create(User, {
				firstName,
				lastName,
				email,
				password: hashedPassword,
			})

			await db.persistAndFlush(user)

			if (req.session) {
				req.session.userID = user.id
				console.log('session created yaaay')
			}

			return user
		} catch (error) {
			console.error(error)
			return undefined
		}
	}
}
