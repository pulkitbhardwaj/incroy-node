import React, { FC } from 'react'
import { createUseStyles } from 'react-jss'
import { Theme } from '../../theme'
import Nav, { NavLink } from '../Nav'

interface SidebarProps {
	width?: string | number
}

const useSidebarStyles = createUseStyles((theme: Theme) => ({
	sidebar: () => ({
		width: '20%',
		height: '100vh',
		position: 'sticky',
		top: 0,
		left: 0,
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'stretch',
		justifyContent: 'stretch',
		backgroundColor: theme.background.color.grey,
		boxShadow: theme.shadow,
		zIndex: -1,
	}),
	navLink: {
		textDecoration: 'none',
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		height: 28 * 1.5,
		width: '100%',
		color: 'blue',
		border: {
			radius: 0,
			style: 'solid',
			width: 0,
			color: 'grey',
		},
	},
}))

const Sidebar: FC<SidebarProps> = ({ width }) => {
	const { sidebar, navLink } = useSidebarStyles({ width })

	return (
		<div className={sidebar}>
			<Nav direction="column">
				<NavLink className={navLink} href="/">
					Home
				</NavLink>
				<NavLink className={navLink} href="/about">
					About
				</NavLink>
				<NavLink className={navLink} href="/login">
					Login
				</NavLink>
				<NavLink className={navLink} href="/signup">
					SignUp
				</NavLink>
			</Nav>
		</div>
	)
}

export default Sidebar
