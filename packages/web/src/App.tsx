import React from 'react'
import { Container } from '@material-ui/core'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Header from './components/Header'
import LogIn from './pages/login'
import Register from './pages/register'
import { ThemeProvider } from 'react-jss'
import { theme } from './theme'
import Header2 from './components/Header2'

function App() {
	return (
		<BrowserRouter>
			<ThemeProvider theme={theme}>
				<Header />
				<Header2 />
				<Container maxWidth="xl">
					<Switch>
						<Route exact path="/">
							<h1>Hello asdasdbaby</h1>
						</Route>
						<Route path="/login">
							<LogIn />
						</Route>
						<Route path="/register">
							<Register />
						</Route>
					</Switch>
				</Container>
			</ThemeProvider>
		</BrowserRouter>
	)
}

export default App
