import { createMuiTheme } from '@material-ui/core/styles'
import { red } from '@material-ui/core/colors'

export const colors = {
	white: '#F3F8F2',
	blue: '#3581B8',
	teal: '#0C7489',
	darkTeal: '#13505B',
	black: '#040404',
	darkRed: '#C42847',
	red: '#DE3C4B',
	orange: '#F18701',
	darkOrange: '#F35B04',

	grey: '#C9C9C9',
	darkGrey: '#A3A3A3',
	darkerGrey: '#424242',
}

// Create a theme instance.
export const theme = createMuiTheme({
	palette: {
		primary: {
			main: '#556cd6',
		},
		secondary: {
			main: '#19857b',
		},
		error: {
			main: red.A400,
		},
		background: {
			default: '#fff',
		},
	},
})
