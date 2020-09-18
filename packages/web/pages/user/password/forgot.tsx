import { NextPage } from 'next'
import { useEffect, useState } from 'react'
import { useFormik } from 'formik'
import NextLink from 'next/link'
import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Link from '@material-ui/core/Link'
import Grid from '@material-ui/core/Grid'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import Typography from '@material-ui/core/Typography'
import Container from '@material-ui/core/Container'
import { makeStyles } from '@material-ui/core/styles'
import Alert from '@material-ui/lab/Alert'
import { useRouter } from 'next/router'
import Layout from '../../../components/Layout'
import { useForgotPasswordMutation } from '../../../graphql'

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

const ForgotPassword: NextPage = () => {
	const classes = useStyles()

	const [success, setSuccess] = useState('')

	const router = useRouter()

	const [forgotPassword, { error }] = useForgotPasswordMutation()

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
		},
		onSubmit: async (values) => {
			let res = await forgotPassword({
				variables: { email: values.email },
			})

			if (res.data?.forgotPassword) {
				setSuccess('An Email has been sent to reset password.')
			}

			// router.push('/')
		},
	})

	useEffect(() => {
		console.log('effect error')
		if (error) {
			setErrors({
				email: error.message,
			})
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
						Forgot Password
					</Typography>
					<form className={classes.form} onSubmit={handleSubmit}>
						<TextField
							variant="outlined"
							margin="normal"
							required
							fullWidth
							name="email"
							label="Enter your Email"
							type="email"
							id="email"
							autoFocus
							value={values.email}
							onChange={handleChange}
							onBlur={handleBlur}
							error={!!errors.email}
							helperText={errors.email}
						/>
						<Button
							type="submit"
							fullWidth
							variant="contained"
							color="primary"
							className={classes.submit}>
							Change Password
						</Button>
						<Grid container justify="flex-end">
							<Grid item>
								<NextLink href="/user/login">
									<Link href="#" variant="body2">
										Back to Login
									</Link>
								</NextLink>
							</Grid>
						</Grid>
						{success && <Alert severity="success">{success}</Alert>}
					</form>
				</div>
			</Container>
		</Layout>
	)
}

export default ForgotPassword
