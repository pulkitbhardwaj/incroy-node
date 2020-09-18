import { NextPage } from 'next'
import Link from 'next/link'
import Layout from '../components/Layout'
import { MeDocument } from '../graphql'
import { initializeApollo } from '../graphql/apollo'

const IndexPage: NextPage = () => {
	return (
		<Layout title="Home | Next.js + TypeScript Example">
			<h1>Hello Next.js 👋</h1>
			<p>
				<Link href="/about">
					<a>About</a>
				</Link>
			</p>
		</Layout>
	)
}

export default IndexPage
