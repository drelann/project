import React, { useState } from "react"
import { makeStyles } from "@material-ui/core/styles"
import Button from "@material-ui/core/Button"
import TextField from "@material-ui/core/TextField"

const useStyles = makeStyles((theme) => ({
	content: {
		display: "flex",
		flexFlow: "row nowrap",
		alignItems: "center",
	},
	text: {
		marginRight: theme.spacing(2),
	},
}))

const Form2 = ({ header, action, label1, label2 }) => {
	const classes = useStyles()
	const [value, setValue] = useState({
		value1: "",
		value2: "",
	})

	const handleTextChange = (e) => {
		const { value, name } = e.target
		setValue((prevState) => {
			return {
				...prevState,
				[name]: value,
			}
		})
	}

	const handleClick = () => {
		action(value.value1, value.value2)
		window.location.reload()
	}

	return (
		<div>
			<h2>{header}</h2>
			<div className={classes.content}>
				<TextField
					className={classes.text}
					name='value1'
					label={label1}
					value={value.value2}
					onChange={handleTextChange}
				/>
				<TextField
					className={classes.text}
					name='value2'
					label={label2}
					value={value.value2}
					onChange={handleTextChange}
				/>

				<Button variant='contained' color='primary' onClick={handleClick}>
					Добавить
				</Button>
			</div>
		</div>
	)
}

export default Form2
