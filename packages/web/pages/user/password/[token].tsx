import { NextPage } from 'next'
import { useEffect } from 'react'
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

import { useRouter } from 'next/router'
import Layout from '../../../components/Layout'
import { MeDocument, useChangePasswordMutation } from '../../../graphql'

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

const ChangePassword: NextPage = () => {
	const classes = useStyles()

	const [changePassword, { error }] = useChangePasswordMutation({
		refetchQueries: [{ query: MeDocument }],
	})

	const router = useRouter()

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
			password: '',
		},
		onSubmit: async (values) => {
			let res = await changePassword({
				variables: {
					token: router.query.token as string,
					password: values.password,
				},
			})

			if (res.data?.changePassword) {
				router.push('/')
			}
		},
	})

	useEffect(() => {
		console.log('effect error')
		if (error) {
			setErrors({
				password: error.message,
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
						Change Password
					</Typography>
					<form className={classes.form} onSubmit={handleSubmit}>
						<TextField
							variant="outlined"
							margin="normal"
							required
							fullWidth
							name="password"
							label="New Password"
							type="password"
							id="password"
							autoFocus
							value={values.password}
							onChange={handleChange}
							onBlur={handleBlur}
							error={!!errors.password}
							helperText={errors.password}
						/>
						<Button
							type="submit"
							fullWidth
							variant="contained"
							color="primary"
							className={classes.submit}>
							Change
						</Button>
						<Grid container>
							<Grid item>
								<NextLink href="/user/password/forgot">
									<Link href="#" variant="body2">
										Token expired? Get a new one
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

export default ChangePassword
