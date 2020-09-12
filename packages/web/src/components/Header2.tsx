import React from 'react'
import { createUseStyles } from 'react-jss'
import { Link } from 'react-router-dom'
import { Theme } from '../theme'

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
	menuButton: {},
}))

const Header: React.FC<HeaderProps> = ({ height }) => {
	const { header, menuButton } = useStyles({ height })

	return (
		<header className={header}>
			{/* <Button className={menuButton} to="/">
				enu Button */}
			{/* </Button> */}
			<Link to="/"></Link>
			{/* Logo */}
			{/* Search Bar */}
		</header>
	)
}

export default Header
