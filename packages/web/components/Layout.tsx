import React, { FC, Fragment } from 'react'
import Head from 'next/head'
// import Footer from './Footer'
import { Header } from './Header'
import { AuthProvider } from '../context/Auth'

interface Props {
	title?: string
	description?: string
}

const Layout: FC<Props> = ({
	children,
	title = 'This is the default title',
	description = 'This is default description',
}) => {
	return (
		<Fragment>
			<Head>
				<title>{title}</title>
				<meta charSet="utf-8" />
				<meta name="viewport" content="initial-scale=1.0, width=device-width" />
				<meta name="description" content={description} />
				<link
					rel="stylesheet"
					href="https://fonts.googleapis.com/css2?family=Open+Sans&family=Roboto&display=swap"
				/>
			</Head>
			<AuthProvider>
				<Header />
				{children}
				{/* <Footer /> */}
			</AuthProvider>
		</Fragment>
	)
}

export default Layout
