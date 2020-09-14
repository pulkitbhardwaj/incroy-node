import { AppProps } from 'next/app'
import React, { useEffect } from 'react'
import { ThemeProvider } from 'react-jss'
import { ApolloProvider } from '@apollo/client'

import { theme } from '../theme'
import { useApollo } from '../graphql'

export default function App({ Component, pageProps }: AppProps) {
	// For Apollo Client
	const client = useApollo(pageProps.initialApolloState)

	// For React JSS
	useEffect(() => {
		const style = document.getElementById('server-side-styles')

		if (style) {
			style.parentNode?.removeChild(style)
		}
	}, [])

	return (
		<ThemeProvider theme={theme}>
			<ApolloProvider client={client}>
				<Component {...pageProps} />
			</ApolloProvider>
		</ThemeProvider>
	)
}
