import React from 'react'
import ReactDOM from 'react-dom'
import { ThemeProvider } from 'react-jss'
import { BrowserRouter } from 'react-router-dom'
import { RelayEnvironmentProvider } from 'react-relay/hooks'
import { theme } from './theme'
import { environment } from './environment'
import App from './App'

ReactDOM.render(
	<React.StrictMode>
		<ThemeProvider theme={theme}>
			<RelayEnvironmentProvider environment={environment}>
				<BrowserRouter>
					<App />
				</BrowserRouter>
			</RelayEnvironmentProvider>
		</ThemeProvider>
	</React.StrictMode>,
	document.getElementById('root'),
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
