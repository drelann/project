import React, { useState, useEffect } from "react"
import TableRow from "@material-ui/core/TableRow"
import TableCell from "@material-ui/core/TableCell"
import TextField from "@material-ui/core/TextField"
import Button from "@material-ui/core/Button"

const TableFormRow = ({ values = {}, handleSave, handleDelete }) => {
	const valuesArray = Object.values(values)

	const [text, setText] = useState({
		value1: "",
		value2: "",
	})

	const handleTextChange = (e) => {
		const { value, name } = e.target
		setText((prevState) => {
			return {
				...prevState,
				[name]: value,
			}
		})
	}

	const saveButtonClick = () => {
		handleSave(text.id, text.value1, text.value2)
		window.location.reload()
	}

	const deleteButtonClick = () => {
		handleDelete(text.id)
	}

	useEffect(() => {
		if (valuesArray.length !== 0) {
			setText({
				id: valuesArray[0],
				value1: valuesArray[1],
				value2: valuesArray[2],
			})
		}
	}, [valuesArray, setText])

	return (
		<TableRow>
			<TableCell>{text.id}</TableCell>
			<TableCell>
				<TextField name='value1' label='Значение' value={text.value1} onChange={handleTextChange} />
			</TableCell>
			<TableCell>
				<TextField name='value2' label='Значение' value={text.value2} onChange={handleTextChange} />
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

export default TableFormRow
