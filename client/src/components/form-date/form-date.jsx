import React from "react"
import { makeStyles } from "@material-ui/core/styles"
import TextField from "@material-ui/core/TextField"
import FormControl from "@material-ui/core/FormControl"

const useStyles = makeStyles((theme) => ({
	formControl: {
		margin: theme.spacing(1),
		minWidth: 120,
	},
	textField: {
		marginLeft: theme.spacing(1),
		marginRight: theme.spacing(1),
		width: 200,
	},
}))

const FormDate = ({ name, defaultValue }) => {
	const classes = useStyles()

	return (
		<FormControl className={classes.formControl}>
			<TextField
				name={name}
				label='Дата'
				type='date'
				defaultValue={defaultValue}
				className={classes.textField}
				InputLabelProps={{
					shrink: true,
				}}
			/>
		</FormControl>
	)
}

export default FormDate