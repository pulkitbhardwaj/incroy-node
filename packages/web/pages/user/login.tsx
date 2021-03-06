import { NextPage } from 'next'
import { useEffect } from 'react'
import { useFormik } from 'formik'
import Layout from '../../components/Layout'
import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Checkbox from '@material-ui/core/Checkbox'
import Link from '@material-ui/core/Link'
import Grid from '@material-ui/core/Grid'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import Typography from '@material-ui/core/Typography'
import Container from '@material-ui/core/Container'
import { makeStyles } from '@material-ui/core/styles'
import { MeDocument, useLoginMutation } from '../../graphql'
import { useRouter } from 'next/router'
import NextLink from 'next/link'

interface Props {}

const useStyles = makeStyles((theme) => ({
	paper: {
		marginTop: theme.spacing(8),
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
	},
	avatar: {
		margin: theme.spacing(1),
		backgroundColor: theme.palette.secondary.main,
	},
	form: {
		width: '100%', // Fix IE 11 issue.
		marginTop: theme.spacing(1),
	},
	submit: {
		margin: theme.spacing(3, 0, 2),
	},
}))

const Login: NextPage<Props> = () => {
	const classes = useStyles()

	const router = useRouter()

	const [login, { error }] = useLoginMutation({
		refetchQueries: [{ query: MeDocument }],
	})

	const {
		values,
		handleChange,
		handleBlur,
		handleSubmit,
		isSubmitting,
		errors,
		setErrors,
	} = useFormik({
		initialValues: {
			email: '',
			password: '',
		},
		onSubmit: async (values) => {
			await login({
				variables: { email: values.email, password: values.password },
			})
			router.push('/')
		},
	})

	useEffect(() => {
		console.log('effect error')
		if (error) {
			console.log(isSubmitting)

			switch (error.message) {
				case 'invalid email':
					setErrors({
						email: 'Invalid Email',
					})
					break

				case 'invalid password':
					setErrors({
						password: 'Invalid Password',
					})
					break
			}
		}
	}, [error])

	return (
		<Layout title="Log In">
			<Container component="main" maxWidth="xs">
				<div className={classes.paper}>
					<Avatar className={classes.avatar}>
						<LockOutlinedIcon />
					</Avatar>
					<Typography component="h1" variant="h5">
						Sign in
					</Typography>
					<form className={classes.form} onSubmit={handleSubmit}>
						<TextField
							variant="outlined"
							margin="normal"
							required
							fullWidth
							id="email"
							label="Email Address"
							name="email"
							autoComplete="email"
							autoFocus
							value={values.email}
							onChange={handleChange}
							onBlur={handleBlur}
							error={!!errors.email}
							helperText={errors.email}
						/>
						<TextField
							variant="outlined"
							margin="normal"
							required
							fullWidth
							name="password"
							label="Password"
							type="password"
							id="password"
							autoComplete="current-password"
							value={values.password}
							onChange={handleChange}
							onBlur={handleBlur}
							error={!!errors.password}
							helperText={errors.password}
						/>
						<FormControlLabel
							control={<Checkbox value="remember" color="primary" />}
							label="Remember me"
						/>
						<Button
							type="submit"
							fullWidth
							variant="contained"
							color="primary"
							className={classes.submit}>
							Sign In
						</Button>
						<Grid container>
							<Grid item xs>
								<NextLink href="/user/password/forgot">
									<Link href="#" variant="body2">
										Forgot password?
									</Link>
								</NextLink>
							</Grid>
							<Grid item>
								<NextLink href="/user/register">
									<Link href="#" variant="body2">
										{"Don't have an account? Sign Up"}
									</Link>
								</NextLink>
							</Grid>
						</Grid>
					</form>
				</div>
			</Container>
		</Layout>
	)
}

export default Login
