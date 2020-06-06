import React from "react"
import { makeStyles } from "@material-ui/core/styles"
import FormSelect from "../form-select/form-select"
import FormDate from "../form-date/form-date"
import Button from "@material-ui/core/Button"

const useStyles = makeStyles((theme) => ({
	content: {
		display: "flex",
		flexFlow: "row nowrap",
		alignItems: "center",
	},
}))

const Form1 = () => {
	const classes = useStyles()

	return (
		<div>
			<h2>Добавить заказ</h2>
			<div className={classes.content}>
				<FormSelect name='client-select' label='Клиент' isMultiple={false} />
				<FormSelect name='service-select' label='Услуги' isMultiple={true} />
				<FormDate name='date-form1' defaultValue='' />
				<Button variant='contained' color='primary'>
					Добавить
				</Button>
			</div>
		</div>
	)
}

export default Form1
