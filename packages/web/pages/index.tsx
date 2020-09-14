import Link from 'next/link'
import { createUseStyles } from 'react-jss'
import Input from '../components/Input'
import Layout from '../components/Layout'

const useStyles = createUseStyles({
	index: {
		backgroundColor: 'green',
	},
})

const IndexPage = () => {
	const { index } = useStyles()

	return (
		<Layout title="Home | Next.js + TypeScript Example">
			<h1 className={index}>Hello Next.js 👋</h1>
			<p>
				<Link href="/about">
					<a>About</a>
				</Link>
				<Input type="text" />
			</p>
		</Layout>
	)
}

export default IndexPage
