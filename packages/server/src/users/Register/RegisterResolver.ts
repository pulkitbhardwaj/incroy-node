import { User } from './../Entities/User'
import { Resolver, Query, Arg, Mutation } from 'type-graphql'
import bcrypt from 'bcrypt'

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
	): Promise<User | undefined> {
		const hashedPassword = await bcrypt.hash(password, 12)

		const user = await User.create({
			firstName,
			lastName,
			email,
			password: hashedPassword,
		})

		if (!user) {
			return undefined
		}

		return await user.save()
	}
}
