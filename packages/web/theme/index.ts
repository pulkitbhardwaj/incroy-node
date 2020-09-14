export interface Theme {
	backgroundColor: string
	background: {
		color: any
	}
	input: any
	shadow: any
}

export const theme: Theme = {
	backgroundColor: 'blue',

	background: {
		color: {
			white: 'white',
			grey: 'whitesmoke',
		},
	},

	input: {
		width: '100%',
		padding: 12,
		fontSize: 16,
		backgroundColor: 'whitesmoke',
		backgroundClip: 'padding-box',
		border: {
			width: 1,
			style: 'solid',
			color: '#ced4da',
			radius: 5,
		},
		outline: 0,
	},

	shadow: {
		x: 0,
		y: 0,
		blur: 5,
		spread: 0,
		color: '#b0b0b0',
	},
}
