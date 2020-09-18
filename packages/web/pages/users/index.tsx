import { FC } from 'react'
import Link from 'next/link'
import Layout from '../../components/Layout'
import { UsersDocument, useUsersQuery } from '../../graphql'
import { initializeApollo } from '../../graphql/apollo'

const Users: FC = () => {
	const { data, loading, error } = useUsersQuery()

	if (loading) return <h1>Loading...</h1>
	if (error) return <h1>Error! {error.message}</h1>

	return (
		<Layout title="Users List | Next.js + TypeScript Example">
			<h1>Users List</h1>
			<p>
				Example fetching data from inside <code>getStaticProps()</code>.
			</p>
			<p>You are currently on: /users</p>
			{data?.users.map((user) => (
				<p key={user.id}>{user.firstName}</p>
			))}
			<p>
				<Link href="/">
					<a>Go home</a>
				</Link>
			</p>
		</Layout>
	)
}

export default Users

// Render SSR Apollo Client
export async function getStaticProps() {
	const apolloClient = initializeApollo()

	await apolloClient.query({
		query: UsersDocument,
	})

	return {
		props: {
			initialApolloState: apolloClient.cache.extract(),
		},
		revalidate: 1,
	}
}
