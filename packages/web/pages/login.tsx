import React, { FC, FormEventHandler } from 'react'
import { createUseStyles } from 'react-jss'
import { useInput } from '../components/Input'
import Layout from '../components/Layout'
import { Theme } from '../theme'
import { useMutation, gql, useApolloClient } from '@apollo/client'

interface LoginProps {}

const useStyles = createUseStyles((theme: Theme) => ({
	form: {
		height: '100vh',
		width: '50%',
		margin: 'auto',
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		justifyContent: 'center',
	},
	input: {
		margin: 16,
		...theme.input,
	},
}))

const Login: FC<LoginProps> = () => {
	const { form, input } = useStyles()

	const [username, onUsernameChange] = useInput('')
	const [password, onPasswordChange] = useInput('')

	const mutation = gql`
		mutation Login($email: String!, $password: String!) {
			login(email: $email, password: $password) {
				id
				firstName
				email
			}
		}
	`

	const [login, { data }] = useMutation(mutation, { client: useApolloClient() })

	const submit: FormEventHandler = (event) => {
		event.preventDefault()
		login({ variables: { email: username, password } })
	}

	return (
		<Layout title="Log In">
			<h1>Log In</h1>
			<form className={form} onSubmit={submit} autoComplete="off">
				<input
					className={input}
					type="text"
					name="username"
					id="username"
					value={username}
					onChange={onUsernameChange}
				/>
				<input
					className={input}
					type="password"
					name="password"
					id="password"
					value={password}
					onChange={onPasswordChange}
				/>
				<button type="submit">Log In</button>
			</form>
			{data && <h1>{data.firstName}</h1>}
		</Layout>
	)
}

export default Login
