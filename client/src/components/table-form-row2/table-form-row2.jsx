import React, { useState } from "react"
import TableRow from "@material-ui/core/TableRow"
import TableCell from "@material-ui/core/TableCell"
import { useSelector } from "react-redux"
import Button from "@material-ui/core/Button"
import FormSelect from "../form-select/form-select"
import FormDate from "../form-date/form-date"

const TableFormRow2 = ({ values = {}, handleSave, handleDelete }) => {
	const valuesArray = Object.values(values)
	const { services, clients } = useSelector((state) => state.laba5Reducer)
	const [date, setDate] = useState(valuesArray[1].slice(0, 10).replace(/-/g, "-"))
	const [client, setClient] = useState(valuesArray[2])
	const [servicesArray, setServicesArray] = useState(valuesArray[4].map((item) => item.serviceId))

	const saveButtonClick = () => {
		handleSave(valuesArray[0], date, client, servicesArray)
		window.location.reload()
	}

	const deleteButtonClick = () => {
		handleDelete(valuesArray[0])
		window.location.reload()
	}

	return (
		<TableRow>
			<TableCell>{valuesArray[0]}</TableCell>
			<TableCell>
				<FormDate name='date-select' value={date} setValue={setDate} />
			</TableCell>
			<TableCell>
				<FormSelect
					name='client-select2'
					label='Клиент'
					isMultiple={false}
					data={clients}
					value={client}
					setValue={setClient}
				/>
			</TableCell>
			<TableCell>
				<FormSelect
					name='services-select2'
					label='Услуги'
					isMultiple={true}
					data={services}
					value={servicesArray}
					setValue={setServicesArray}
				/>
			</TableCell>
			<TableCell align='right'>
				<Button color='secondary' onClick={saveButtonClick}>
					Сохранить
				</Button>
				<Button color='secondary' onClick={deleteButtonClick}>
					Удалить
				</Button>
			</TableCell>
		</TableRow>
	)
}

export default TableFormRow2
