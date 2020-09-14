import Link from 'next/link'
import Layout from '../../components/Layout'
import List from '../../components/List'
import { FC } from 'react'
import { gql, useQuery } from '@apollo/client'

const Users: FC = () => {
	const query = gql`
		query usersQuery {
			users {
				id
				firstName
				email
			}
		}
	`
	const { data, loading, error } = useQuery(query)

	if (loading) return <h1>Loading...</h1>
	if (error) return <h1>Error! {error.message}</h1>

	return (
		<Layout title="Users List | Next.js + TypeScript Example">
			<h1>Users List</h1>
			<p>
				Example fetching data from inside <code>getStaticProps()</code>.
			</p>
			<p>You are currently on: /users</p>
			<List items={data.users} />

			<p>
				<Link href="/">
					<a>Go home</a>
				</Link>
			</p>
		</Layout>
	)
}

export default Users
