import React, { useState } from "react"
import { makeStyles } from "@material-ui/core/styles"
import FormSelect from "../form-select/form-select"
import FormDate from "../form-date/form-date"
import Button from "@material-ui/core/Button"
import { addApplications } from "../../api/index"

const useStyles = makeStyles((theme) => ({
	content: {
		display: "flex",
		flexFlow: "row nowrap",
		alignItems: "center",
	},
}))

const Form1 = ({ addApplication, clients, services }) => {
	const classes = useStyles()
	const [client, setClient] = useState("")
	const [servicesArray, setServices] = useState([])

	const handleClick = () => {
		addApplications(client, servicesArray.join(","))
		window.location.reload()
	}

	return (
		<div>
			<h2>Добавить заказ</h2>
			<div className={classes.content}>
				<FormSelect
					name='client-select'
					label='Клиент'
					isMultiple={false}
					data={clients}
					value={client}
					setValue={setClient}
				/>
				<FormSelect
					name='service-select'
					label='Услуги'
					isMultiple={true}
					data={services}
					value={servicesArray}
					setValue={setServices}
				/>

				<Button variant='contained' color='primary' onClick={handleClick}>
					Добавить
				</Button>
			</div>
		</div>
	)
}

export default Form1
