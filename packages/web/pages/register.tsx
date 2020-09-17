import React, { FC, useEffect } from 'react'
import { useFormik } from 'formik'
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
import { MeDocument, useRegisterMutation } from '../graphql'
import Layout from '../components/Layout'
import { useRouter } from 'next/router'

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
		marginTop: theme.spacing(3),
	},
	submit: {
		margin: theme.spacing(3, 0, 2),
	},
}))

export const Register: FC = () => {
	const classes = useStyles()
	const router = useRouter()

	const [register, { error }] = useRegisterMutation({
		refetchQueries: [{ query: MeDocument }],
	})

	const {
		values,
		handleChange,
		handleBlur,
		handleSubmit,
		errors,
		setErrors,
	} = useFormik({
		initialValues: {
			firstName: '',
			lastName: '',
			email: '',
			password: '',
		},
		onSubmit: async (values) => {
			await register({
				variables: {
					firstName: values.firstName,
					lastName: values.lastName,
					email: values.email,
					password: values.password,
				},
			})
			router.push('/')
		},
	})

	useEffect(() => {
		console.log('effect error')
		if (error) {
			switch (error.message) {
				case 'email already in use':
					setErrors({
						email: 'Email already in use',
					})
					break
			}
		}
	}, [error])

	return (
		<Layout title="Register">
			<Container component="main" maxWidth="xs">
				<div className={classes.paper}>
					<Avatar className={classes.avatar}>
						<LockOutlinedIcon />
					</Avatar>
					<Typography component="h1" variant="h5">
						Sign up
					</Typography>
					<form className={classes.form} onSubmit={handleSubmit} noValidate>
						<Grid container spacing={2}>
							<Grid item xs={12} sm={6}>
								<TextField
									autoComplete="fname"
									name="firstName"
									variant="outlined"
									required
									fullWidth
									id="firstName"
									label="First Name"
									autoFocus
									value={values.firstName}
									onChange={handleChange}
									onBlur={handleBlur}
									error={!!errors.firstName}
									helperText={errors.firstName}
								/>
							</Grid>
							<Grid item xs={12} sm={6}>
								<TextField
									variant="outlined"
									required
									fullWidth
									id="lastName"
									label="Last Name"
									name="lastName"
									autoComplete="lname"
									value={values.lastName}
									onChange={handleChange}
									onBlur={handleBlur}
									error={!!errors.lastName}
									helperText={errors.lastName}
								/>
							</Grid>
							<Grid item xs={12}>
								<TextField
									variant="outlined"
									required
									fullWidth
									id="email"
									label="Email Address"
									name="email"
									autoComplete="email"
									value={values.email}
									onChange={handleChange}
									onBlur={handleBlur}
									error={!!errors.email}
									helperText={errors.email}
								/>
							</Grid>
							<Grid item xs={12}>
								<TextField
									variant="outlined"
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
							</Grid>
							<Grid item xs={12}>
								<FormControlLabel
									control={
										<Checkbox value="allowExtraEmails" color="primary" />
									}
									label="I want to receive inspiration, marketing promotions and updates via email."
								/>
							</Grid>
						</Grid>
						<Button
							type="submit"
							fullWidth
							variant="contained"
							color="primary"
							className={classes.submit}>
							Sign Up
						</Button>
						<Grid container justify="flex-end">
							<Grid item>
								<Link href="#" variant="body2">
									Already have an account? Sign in
								</Link>
							</Grid>
						</Grid>
					</form>
				</div>
			</Container>
		</Layout>
	)
}

export default Register
