import { ChangePasswordInput } from './ChangePasswordInput'
import { ResolverContext, sendEmail } from '@incroy/core'
import { User } from '../../../entities/User'
import { Resolver, Arg, Mutation, Ctx } from 'type-graphql'
import Validator from 'validator'
import { hash } from 'argon2'
import { v4 as createToken } from 'uuid'
import { UserInputError } from 'apollo-server-express'

const PASSWORD_PREFIX = 'pass:'

@Resolver()
export class PasswordResolver {
	@Mutation(() => Boolean)
	async changePassword(
		@Arg('options') { token, password }: ChangePasswordInput,
		@Ctx() { req, redis, db }: ResolverContext,
	) {
		const id = await redis.get(PASSWORD_PREFIX + token)

		if (!id) {
			throw new Error('token expired')
		}

		const user = await db.findOne(User, { id: parseInt(id) })

		if (!user) {
			throw new Error('bad token')
		}

		user.password = await hash(password)

		await db.persistAndFlush(user)

		console.log('password changed yaay')

		if (req.session) {
			req.session.userID = user.id
			console.log('session created yaaay')
		}

		await redis.del(PASSWORD_PREFIX + token)

		return true
	}

	@Mutation(() => Boolean)
	async forgotPassword(
		@Arg('email') email: string,
		@Ctx() { redis, db }: ResolverContext,
	) {
		if (!Validator.isEmail(email)) {
			throw new UserInputError('invalid email')
		}

		const user = await db.findOne(User, { email })

		if (!user) {
			throw new UserInputError('invalid email')
		}

		const token = createToken()

		await redis.set(PASSWORD_PREFIX + token, user.id, 'ex', 1000 * 60 * 60 * 24)

		await sendEmail({
			to: email,
			html: `<a href="http://localhost:3000/user/password/${token}">Reset Password</a>`,
		})

		console.log('email sent yay')

		return true
	}
}
