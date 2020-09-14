import React, { FC, Fragment } from 'react'
import { createUseStyles } from 'react-jss'
import Head from 'next/head'
import { Theme } from '../theme'
import Footer from './Footer'
import Header from './header'

type Props = {
	title?: string
}

const useGlobalStyles = createUseStyles((_theme: Theme) => ({
	'@global': {
		'*': {
			margin: 0,
			padding: 0,
		},
		body: {
			margin: 0,
			fontFamily:
				'-apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue" sans-serif',
			'-webkit-font-smoothing': 'antialiased',
			'-moz-osx-font-smoothing': 'grayscale',
		},
		code: {
			fontFamily:
				'source-code-pro, Menlo, Monaco, Consolas, "Courier New", monospace',
		},
		a: {
			textDecoration: 'none',
		},
	},
}))

const Layout: FC<Props> = ({
	children,
	title = 'This is the default title',
}) => {
	useGlobalStyles()

	return (
		<Fragment>
			<Head>
				<title>{title}</title>
				<meta charSet="utf-8" />
				<meta name="viewport" content="initial-scale=1.0, width=device-width" />
			</Head>
			<Header />
			{children}
			<Footer />
		</Fragment>
	)
}

export default Layout
