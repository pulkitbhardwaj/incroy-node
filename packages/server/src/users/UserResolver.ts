import { User } from './Entities/User'
import { ResolverContext } from '@incroy/core'
import { Resolver, Query, Arg, Ctx, ID } from 'type-graphql'

@Resolver()
export class UserResolver {
	@Query(() => [User])
	async users(@Ctx() { db }: ResolverContext): Promise<User[]> {
		return await db.find(User, {})
	}

	@Query(() => User, { nullable: true })
	async user(
		@Arg('id', () => ID) id: number,
		@Ctx() { db }: ResolverContext,
	): Promise<User | null> {
		return await db.findOne(User, { id })
	}

	@Query(() => User, { nullable: true })
	async me(@Ctx() { req, db }: ResolverContext): Promise<User | null> {
		if (req.session?.userID)
			return await db.findOne(User, { id: req.session.userID })

		return null
	}
}
