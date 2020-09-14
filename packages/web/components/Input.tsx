import React, {
	ChangeEvent,
	FC,
	Fragment,
	InputHTMLAttributes,
	useState,
} from 'react'
import { createUseStyles } from 'react-jss'
import { Theme } from '../theme'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
	label?: string
}

const useStyles = createUseStyles((_theme: Theme) => ({
	input: ({ type }: InputProps) => {
		switch (type) {
			case 'text':
				return {
					height: 28,
					width: '100%',
					padding: 16,
				}
		}
	},
}))

export interface useInput {
	(initialValue: string | number | readonly string[] | undefined): [
		string | number | readonly string[] | undefined,
		(event: ChangeEvent<HTMLInputElement>) => void,
	]
}

export const useInput: useInput = (initialValue) => {
	const [value, setValue] = useState(initialValue)

	const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
		setValue(event.target.value)
	}

	return [value, handleChange]
}

const Input: FC<InputProps> = ({ type, label, name, value }) => {
	const {} = useStyles({ type })
	const [state, handleChange] = useInput(value)

	return (
		<Fragment>
			<label htmlFor={name}>{label}</label>
			<input type={type} name={name} value={state} onChange={handleChange} />
		</Fragment>
	)
}

export default Input
