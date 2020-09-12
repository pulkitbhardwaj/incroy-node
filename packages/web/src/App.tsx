import React, { Fragment, Suspense } from 'react'
import { Container } from '@material-ui/core'
import { Route, Switch } from 'react-router-dom'
import { createUseStyles } from 'react-jss'
import { Theme } from './theme'
import Header from './components/Header'
import LogIn from './pages/login'
import Register from './pages/register'
import Header2 from './components/Header2'
import { Users } from './pages/users'

const useGlobalStyles = createUseStyles((theme: Theme) => ({
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
	},
}))

function App() {
	useGlobalStyles()

	return (
		<Fragment>
			<Header />
			<Header2 />
			<Container maxWidth="xl">
				<Switch>
					<Suspense fallback={<div>Loading.....</div>}>
						<Route exact path="/">
							<h1>Hello asdasdbaby</h1>
						</Route>
						<Route path="/login">
							<LogIn />
						</Route>
						<Route path="/register">
							<Register />
						</Route>
						<Route path="/users">
							<div>the users are</div>
							<Users />
						</Route>
					</Suspense>
				</Switch>
			</Container>
		</Fragment>
	)
}

export default App
