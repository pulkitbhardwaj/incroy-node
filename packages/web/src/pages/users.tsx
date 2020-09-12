import React from 'react'
import { useLazyLoadQuery } from 'react-relay/hooks'
import { graphql } from 'babel-plugin-relay/macro'
import { usersQuery } from './__generated__/usersQuery.graphql'

// Below you can usually use one query renderer per page
// and it represents the root of a query
export const Users: React.FC = () => {
	const query = graphql`
		query usersQuery {
			# The root field for the query
			users {
				id
				firstName
				lastName
				email
				updatedAt
				createdAt
			}
		}
	`
	const data = useLazyLoadQuery<usersQuery>(query, {})

	return (
		<div>
			the users are
			{data.users.map((user) => (
				<h1>{user.email}</h1>
			))}
		</div>
	)
}
