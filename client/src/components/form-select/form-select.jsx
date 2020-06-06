import React from "react"
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

const FormSelect = ({ name, label, data = [], isMultiple, value, setValue }) => {
	const classes = useStyles()

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
				{data.map((item, index) => (
					<MenuItem key={index} value={item.id}>
						{item.name}
					</MenuItem>
				))}
			</Select>
		</FormControl>
	)
}

export default FormSelect
