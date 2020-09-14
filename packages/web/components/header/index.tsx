import React from 'react'
import { createUseStyles } from 'react-jss'
import { Theme } from '../../theme'
import Nav, { NavLink } from '../Nav'
import Search from './Search'

interface HeaderProps {
	height?: number | string
}

const useStyles = createUseStyles((theme: Theme) => ({
	header: ({ height = 56 }: HeaderProps) => ({
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'space-between',
		width: '100%',
		height: height,
		padding: [0, 16],
		backgroundColor: theme.backgroundColor,
		color: 'white',
	}),
	menuButton: {
		color: 'white',
	},
}))

const Header: React.FC<HeaderProps> = ({ height }) => {
	const { header, menuButton } = useStyles({ height })

	return (
		<header className={header}>
			<h1>Mysite</h1>
			<Search width="25%" />
			<Nav width="50%">
				<NavLink className={menuButton} href="/">
					Home
				</NavLink>
				<NavLink className={menuButton} href="/about">
					About
				</NavLink>
				<NavLink className={menuButton} href="/users">
					Users List
				</NavLink>
				<NavLink className={menuButton} href="/login">
					Login
				</NavLink>
			</Nav>
		</header>
	)
}

export default Header
