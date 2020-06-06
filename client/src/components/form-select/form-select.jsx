import React, { useState } from "react"
import { makeStyles } from "@material-ui/core/styles"
import InputLabel from "@material-ui/core/InputLabel"
import MenuItem from "@material-ui/core/MenuItem"
import FormControl from "@material-ui/core/FormControl"
import Select from "@material-ui/core/Select"

const useStyles = makeStyles((theme) => ({
	formControl: {
		margin: theme.spacing(1),
		minWidth: 120,
	},
	selectEmpty: {
		marginTop: theme.spacing(2),
	},
}))

const FormSelect = ({ name, label, data, isMultiple }) => {
	const classes = useStyles()
	const [value, setValue] = useState(isMultiple ? [] : "")

	const handleChange = (e) => {
		setValue(e.target.value)
	}

	return (
		<FormControl className={classes.formControl}>
			<InputLabel id={`${name}-label`}>{label}</InputLabel>
			<Select
				labelId={`${name}-label`}
				name={name}
				value={value}
				onChange={handleChange}
				label={label}
				multiple={isMultiple}
			>
				<MenuItem value=''>
					<em>None</em>
				</MenuItem>
				<MenuItem value={10}>Ten</MenuItem>
				<MenuItem value={20}>Twenty</MenuItem>
				<MenuItem value={30}>Thirty</MenuItem>
			</Select>
		</FormControl>
	)
}

export default FormSelect
