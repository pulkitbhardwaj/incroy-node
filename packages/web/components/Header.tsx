import React, { FC, Fragment, useState } from 'react'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import { Sidebar } from './Sidebar'
import Link from 'next/link'
import { MeDocument, useLogoutMutation, useMeQuery } from '../graphql'

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

	const { data } = useMeQuery()

	const [logout] = useLogoutMutation({
		refetchQueries: [{ query: MeDocument }],
	})

	const UserButton = data?.me ? (
		<Button
			color="inherit"
			onClick={async () => {
				await logout()
			}}>
			Logout
		</Button>
	) : (
		<Fragment>
			<Link href="/register">
				<Button color="inherit">Register</Button>
			</Link>
			<Link href="/login">
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
						News
					</Typography>
					{UserButton}
				</Toolbar>
			</AppBar>
			<Sidebar toggle={sidebar} setToggle={setSidebar} />
		</div>
	)
}
