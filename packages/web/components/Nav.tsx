import Link from 'next/link'
import React, { FC } from 'react'
import { createUseStyles } from 'react-jss'
import { Url } from 'url'
import { Theme } from '../theme'

/**
 * Navigation Styles
 */
const useStyles = createUseStyles((_theme: Theme) => ({
	nav: ({ width = '100%', direction = 'row' }: NavProps) => ({
		display: 'flex',
		flexDirection: direction,
		alignItems: 'stretch',
		justifyContent: 'space-evenly',
		width: width,
	}),
	navItem: () => ({
		display: 'flex',
		alignItems: 'stretch',
		justifyContent: 'stretch',
	}),
}))

/**
 * Navigation Props
 */
interface NavProps {
	direction?: 'row' | 'column'
	width?: number | string
}

interface NavLinkProps {
	href: Url | string
	className?: string
}

export const NavLink: FC<NavLinkProps> = ({
	href,
	className,
	children,
	...props
}) => {
	return (
		<Link href={href}>
			<a className={className} {...props}>
				{children}
			</a>
		</Link>
	)
}

/**
 * Navigation Component
 */
const Nav: FC<NavProps> = ({ direction, width, children }) => {
	const { nav, navItem } = useStyles({ direction, width })

	return (
		<ul className={nav}>
			{Array.isArray(children)
				? children.map((child, index) => (
						<li key={index} className={navItem}>
							{child}
						</li>
				  ))
				: children}
		</ul>
	)
}

export default Nav
