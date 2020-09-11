import { ObjectType, Field, ID } from 'type-graphql'
import { Entity, Property, PrimaryKey } from '@mikro-orm/core'

@ObjectType()
@Entity()
export class User {
	@Field(() => ID)
	@PrimaryKey()
	id: number

	@Field()
	@Property()
	firstName: string

	@Field()
	@Property()
	lastName: string

	@Field()
	@Property({ unique: true })
	email: string

	@Property()
	password: string

	@Field(() => Date)
	@Property({ type: 'date', onUpdate: () => new Date() })
	updatedAt = new Date()

	@Field(() => Date)
	@Property({ type: 'date' })
	createdAt = new Date()
}
