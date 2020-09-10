import { ObjectType, Field } from 'type-graphql'
import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from 'typeorm'

@ObjectType()
@Entity()
export class User extends BaseEntity {
	@Field()
	@PrimaryGeneratedColumn()
	id: number

	@Field()
	@Column()
	firstName: string

	@Field()
	@Column()
	lastName: string

	@Field()
	@Column()
	email: string

	@Column()
	password: string
}
