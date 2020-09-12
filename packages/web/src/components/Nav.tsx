import React from 'react'
import { createUseStyles } from 'react-jss'
import { Theme } from '../theme'

/**
 * Navigation Props
 */
interface NavProps {
	direction?: 'row' | 'column'
	width?: number | string
}

/**
 * Navigation Styles
 */
const useNavStyles = createUseStyles((theme: Theme) => ({
	nav: ({ width = '100%', direction = 'row' }: NavProps) => ({
		display: 'flex',
		flexDirection: direction,
		alignItems: 'stretch',
		justifyContent: 'stretch',
		width: width,
	}),
	navItem: () => ({
		display: 'flex',
		alignItems: 'stretch',
		justifyContent: 'stretch',
	}),
}))

/**
 * Navigation Component
 */
const Nav: React.FC<NavProps> = ({ direction, width, children }) => {
	const { nav, navItem } = useNavStyles({ direction, width })

	return (
		<ul className={nav}>
			{Array.isArray(children)
				? children.map((child) => <li className={navItem}>{child}</li>)
				: children}
		</ul>
	)
}

export default Nav
