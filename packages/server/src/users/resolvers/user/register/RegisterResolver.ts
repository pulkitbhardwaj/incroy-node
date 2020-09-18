import { UserInputError } from 'apollo-server-express'
import { ResolverContext } from '@incroy/core'
import { User } from '../../../entities/User'
import { Resolver, Query, Arg, Mutation, Ctx } from 'type-graphql'
import { hash } from 'argon2'
import { RegisterInput } from './RegisterInput'

@Resolver()
export class RegisterResolver {
	@Query(() => String)
	async yo() {
		return 'yo'
	}

	@Mutation(() => User)
	async register(
		@Arg('user')
		{ firstName, lastName, email, password }: RegisterInput,
		@Ctx() { req, db }: ResolverContext,
	): Promise<User> {
		if (await db.findOne(User, { email })) {
			throw new UserInputError('email already in use')
		}

		let user, hashedPassword

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
	}
}
