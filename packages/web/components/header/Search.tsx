/**
 *
 * 	REUSABLE SEARCH BAR COMPONENT
 *
 */
import React, { FC, useReducer } from 'react'
import { createUseStyles } from 'react-jss'

interface SearchProps {
	width?: string | number
}

/**
 * Styles
 */
const useStyles = createUseStyles({
	searchBar: (width = '100%') => ({
		position: 'relative', // to place suggestions inside the box
		width: width,
	}),
	searchQuery: {
		width: '100%',
		fontSize: 16,
		padding: [12, 32],
		backgroundColor: 'rgba(255, 255, 255, .1)',
		color: 'red',
		backgroundClip: 'padding-box',
		border: {
			width: 0,
			style: 'solid',
			color: '#ced4da',
			radius: 5,
		},
		outline: 0,
		'&:focus': {
			backgroundColor: 'whitesmoke',
			color: 'grey',
			// boxShadow: [0, 0, 0, 3, 'rgba(255, 255, 255, .25)']
		},
	},
	searchSuggestions: {
		listStyle: 'none',
		width: '100%',
		position: 'absolute',
		top: '100%', // place items below the search bar
		left: 0,
		display: 'flex',
		flexDirection: 'column',
		zIndex: 100,
		backgroundColor: 'whitesmoke',
		color: 'blue',
		padding: [8, 16],
	},
	searchSuggestionsItem: {
		width: '100%',
		display: 'flex',
		fontSize: 16,
		padding: [16, 32],
	},
})

type SearchState = {
	query: string
	suggestions: any[]
	toggleSuggestions: boolean
}

type SearchAction =
	| { type: 'search'; value: string }
	| { type: 'open' }
	| { type: 'close' }

/**
 * React Component
 */
const Search: FC<SearchProps> = ({ width }) => {
	const data = ['pulkit', 'harshit', 'kandy']

	const [{ query, suggestions, toggleSuggestions }, dispatch] = useReducer(
		(state: SearchState, action: SearchAction) => {
			switch (action.type) {
				case 'search':
					return {
						...state,
						query: action.value,
						suggestions: action.value
							? data.filter((item) =>
									item.toLowerCase().includes(action.value.toLowerCase()),
							  )
							: [],
					}
				case 'open':
					return {
						...state,
						toggleSuggestions: true,
					}
				case 'close':
					return {
						...state,
						toggleSuggestions: false,
					}
				default:
					return state
			}
		},
		{
			query: '',
			suggestions: [],
			toggleSuggestions: false,
		},
	)

	const {
		searchBar,
		searchQuery,
		searchSuggestions,
		searchSuggestionsItem,
	} = useStyles(width)

	// Implement Search algorithm her
	const search = () => {}

	return (
		<form className={searchBar} onSubmit={search} autoComplete="off">
			<input
				type="text"
				className={searchQuery}
				name="s"
				id="search"
				placeholder="What are you looking for?"
				value={query}
				onChange={(e) => dispatch({ type: 'search', value: e.target.value })}
				onFocus={() => dispatch({ type: 'open' })}
				onBlur={() => dispatch({ type: 'close' })}
			/>
			{query && suggestions.length && toggleSuggestions ? (
				<ul className={searchSuggestions}>
					{suggestions.map((suggestion) => (
						<li className={searchSuggestionsItem}>{suggestion}</li>
					))}
				</ul>
			) : null}
		</form>
	)
}

export default Search
