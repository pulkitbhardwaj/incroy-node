import React, { FC } from 'react'
import TextField from '@material-ui/core/TextField'

interface Props {}

export const Input: FC<Props> = (props) => {
	return (
		<TextField
			variant="outlined"
			margin="normal"
			required
			fullWidth
			id="email"
			label="Email Address"
			name="email"
			autoComplete="email"
			autoFocus
		/>
	)
}
