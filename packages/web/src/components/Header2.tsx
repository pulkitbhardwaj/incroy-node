import React from 'react'
import { createUseStyles } from 'react-jss'
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
}))

const Header: React.FC<HeaderProps> = ({ height }) => {
	const { header } = useStyles({ height })

	return <header className={header}>Hello</header>
}

export default Header
