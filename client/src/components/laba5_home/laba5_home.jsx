import React, { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import CssBaseline from "@material-ui/core/CssBaseline"
import Container from "@material-ui/core/Container"
import { makeStyles } from "@material-ui/core/styles"
import Form1 from "../form1/form1"
import Form2 from "../form2/form2"
import TableForm from "../table-form/table-form"
import {
	getApplications,
	getClients,
	getServices,
	changeApplication,
	changeClient,
	changeService,
	deleteApplication,
	deleteClient,
	deleteService,
	addService,
	addClient,
} from "../../api/index"
import { setApplications, setClients, setServices } from "../../actions/actionsCreator"

const useStyles = makeStyles((theme) => ({
	container: {
		backgroundColor: "#e0e0e0",
		display: "flex",
		flexFlow: "column nowrap",
		justifyContent: "center",
		marginTop: theme.spacing(12),
		marginBottom: theme.spacing(12),
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
				<Form2 header='Добавить услугу' label1='Название' label2='Цена' action={addService} />
				<Form2 header='Добавить клиента' label1='Имя' label2='Телефон' action={addClient} />
				<TableForm
					header='Список заказов'
					data={applications}
					handleSave={changeApplication}
					handleDelete={deleteApplication}
					isApplication={true}
				/>
				<TableForm
					header='Список услуг'
					data={services}
					handleSave={changeService}
					handleDelete={deleteService}
					isApplication={false}
				/>
				<TableForm
					header='Список клиентов'
					data={clients}
					handleSave={changeClient}
					handleDelete={deleteClient}
					isApplication={false}
				/>
			</Container>
		</>
	)
}

export default Laba5Home
