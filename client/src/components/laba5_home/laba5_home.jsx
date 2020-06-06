import React, { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import CssBaseline from "@material-ui/core/CssBaseline"
import Container from "@material-ui/core/Container"
import { makeStyles } from "@material-ui/core/styles"
import Form1 from "../form1/form1"
import TableForm from "../table-form/table-form"
import {
	getApplications,
	getClients,
	getServices,
	changeClient,
	changeService,
	deleteClient,
	deleteService,
} from "../../api/index"
import { setApplications, setClients, setServices } from "../../actions/actionsCreator"

const useStyles = makeStyles((theme) => ({
	container: {
		backgroundColor: "#e0e0e0",
		display: "flex",
		flexFlow: "column nowrap",
		justifyContent: "center",
		marginTop: 150,
	},
}))

const Laba5Home = () => {
	const dispatch = useDispatch()
	const { applications, services, clients } = useSelector((state) => state.laba5Reducer)
	const classes = useStyles()

	useEffect(() => {
		try {
			getApplications().then((response) => dispatch(setApplications(response.data)))
			getServices().then((response) => dispatch(setServices(response.data)))
			getClients().then((response) => dispatch(setClients(response.data)))
		} catch (exp) {
			alert(exp)
		}
	}, [dispatch])

	return (
		<>
			<CssBaseline />
			<Container className={classes.container} maxWidth='md'>
				<Form1 clients={clients} services={services} />
				<TableForm
					header='Список услуг'
					data={services}
					handleSave={changeService}
					handleDelete={deleteService}
				/>
				<TableForm
					header='Список клиентов'
					data={clients}
					handleSave={changeClient}
					handleDelete={deleteClient}
				/>
			</Container>
		</>
	)
}

export default Laba5Home
