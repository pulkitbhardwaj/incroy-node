import React, { useEffect } from 'react'
import { AppProps } from 'next/app'
import { ThemeProvider } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import { ApolloProvider } from '@apollo/client'

import { theme } from '../theme'
import { useApollo } from '../graphql/apollo'

export default function App({ Component, pageProps }: AppProps) {
	// For Apollo Client
	const client = useApollo(pageProps.initialApolloState)

	// For React JSS
	useEffect(() => {
		const style = document.getElementById('jss-server-side')

		if (style) {
			style.parentNode?.removeChild(style)
		}
	}, [])

	return (
		<ApolloProvider client={client}>
			<ThemeProvider theme={theme}>
				{/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
				<CssBaseline />
				<Component {...pageProps} />
			</ThemeProvider>
		</ApolloProvider>
	)
}
