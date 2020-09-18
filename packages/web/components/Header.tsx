import React, { FC, Fragment, useContext, useState } from 'react'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import { Sidebar } from './Sidebar'
import Link from 'next/link'
import { MeDocument, useLogoutMutation } from '../graphql'
import { Auth } from '../context/Auth'

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		root: {
			flexGrow: 1,
		},
		menuButton: {
			marginRight: theme.spacing(2),
		},
		title: {
			flexGrow: 1,
		},
	}),
)

export const Header: FC = () => {
	const classes = useStyles()

	const [sidebar, setSidebar] = useState(false)

	const user = useContext(Auth)

	const [logout] = useLogoutMutation({
		refetchQueries: [{ query: MeDocument }],
	})

	const UserButton = user ? (
		<Button
			color="inherit"
			onClick={async () => {
				await logout()
			}}>
			Logout
		</Button>
	) : (
		<Fragment>
			<Link href="/user/register">
				<Button color="inherit">Register</Button>
			</Link>
			<Link href="/user/login">
				<Button color="inherit">Login</Button>
			</Link>
		</Fragment>
	)

	return (
		<div className={classes.root}>
			<AppBar position="static">
				<Toolbar>
					<IconButton
						edge="start"
						className={classes.menuButton}
						color="inherit"
						aria-label="menu"
						onClick={() => {
							setSidebar(true)
						}}>
						<MenuIcon />
					</IconButton>
					<Typography variant="h6" className={classes.title}>
						<Link href="/">News</Link>
					</Typography>
					<Link href="/users">
						<Button color="inherit">Users</Button>
					</Link>
					{UserButton}
				</Toolbar>
			</AppBar>
			<Sidebar toggle={sidebar} setToggle={setSidebar} />
		</div>
	)
}
