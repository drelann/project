var express = require("express")
var db = require("../database/index")
var router = express.Router()

//select applications http://localhost:8000/select/application

router.get("/select/application", function (request, response) {
	db({
		clt: "client",
		app: "application",
	})
		.select({
			id: "app.id",
			date: "app.date",
			clientId: "clt.id",
			client: "clt.name",
		})
		.where("app.client_id", "=", db.ref("clt.id"))
		.orderBy("app.id")
		.then((applications) => {
			db({ srv: "service", sfa: "services_app" })
				.select({
					applicationId: "sfa.application_id",
					serviceId: "srv.id",
					service: "srv.name",
				})
				.where("sfa.service_id", "=", db.ref("srv.id"))
				.orderBy("sfa.application_id")
				.then((result) => {
					const data = applications.map((application) => {
						const services = []
						for (let i = 0; i < result.length; i++) {
							if (result[i].applicationId === application.id) {
								const { serviceId, service } = result[i]
								services.push({ serviceId, service })
							}
						}
						return { ...application, services }
					})
					response.send(data)
				})
		})
		.catch((error) => response.send(error))
})

//select clients http://localhost:8000/select/client

router.get("/select/client", function (request, response) {
	db("client")
		.select()
		.orderBy("id")
		.then((data) => response.send(data))
		.catch((error) => response.send(error))
})

//select services http://localhost:8000/select/service

router.get("/select/service", function (request, response) {
	db("service")
		.select()
		.orderBy("id")
		.then((data) => response.send(data))
		.catch((error) => response.send(error))
})

//insert application http://localhost:8000/insert/application?client=id&services=id1,id2...

router.get("/insert/application", function (request, response) {
	const clientID = request.query["client"]
	const services = request.query["services"].split(",")
	const date = new Date().toISOString("YYYY-MM-DD")

	db("application")
		.insert({ client_id: clientID, date: date })
		.then(() => {
			db("application")
				.max({ id: "application.id" })
				.then((row) => {
					const values = services.map((service) => ({
						application_id: +row[0].id,
						service_id: +service,
					}))

					db("services_app")
						.insert(values)
						.then(() => response.send("Данные добавлены"))
				})
		})
		.catch((error) => response.send(error))
})

//insert service http://localhost:8000/insert/service?name=serviceName&price=servicePrice

router.get("/insert/services", function (request, response) {
	const name = request.query["name"]
	const price = request.query["price"]

	db("service")
		.insert({ name, price })
		.then(() => response.send("Данные добавлены"))
		.catch((error) => response.send(error))
})

//insert client http://localhost:8000/insert/client?name=clientName&phone=clientPhone

router.get("/insert/services", function (request, response) {
	const name = request.query["name"]
	const phone = request.query["phone"]

	db("client")
		.insert({ name, phone })
		.then(() => response.send("Данные добавлены"))
		.catch((error) => response.send(error))
})

//delete application http://localhost:8000/delete/application?id=applicationId

router.get("/delete/application", function (request, response) {
	const id = request.query["id"]

	db("services_app")
		.where("application_id", "=", +id)
		.del()
		.then(() =>
			db("application")
				.where("id", "=", +id)
				.del()
				.then(() => response.send("Данные удалены"))
		)
		.catch((error) => response.send(error))
})

//delete service http://localhost:8000/delete/service?id=serviceId

router.get("/delete/service", function (request, response) {
	const id = request.query["id"]

	db("service")
		.where("id", "=", id)
		.del()
		.then(() => response.send("Данные удалены"))
		.catch((error) => response.send(error))
})

//delete client http://localhost:8000/delete/client?id=clientId

router.get("/delete/client", function (request, response) {
	const id = request.query["id"]

	db("client")
		.where("id", "=", id)
		.del()
		.then(() => response.send("Данные удалены"))
		.catch((error) => response.send(error))
})

//update application http://localhost:8000/update/application?id=applicationId&client=clientId&services=id1,id2..

router.get("/update/application", function (request, response) {
	const applicationId = request.query["id"]
	const clientId = request.query["client"]
	const services = request.query["services"].split(",")

	db("application")
		.where("id", "=", applicationId)
		.update({ client_id: clientId })
		.then(() =>
			db("services_app")
				.where("application_id", "=", applicationId)
				.del()
				.then(() => {
					const values = services.map((service) => ({
						application_id: +applicationId,
						service_id: +service,
					}))

					db("services_app")
						.insert(values)
						.then(() => response("Данные обновлены!"))
				})
		)
		.catch((error) => response.send(error))
})

//update service http://localhost:8000/update/service?id=serviceId&name=serviceName&price=servicePrice

router.get("/update/service", function (request, response) {
	const serviceId = request.query["id"]
	const name = request.query["name"]
	const price = request.query["price"]

	db("service")
		.where("id", "=", serviceId)
		.update({ name, price })
		.then(() => response("Данные обновлены!"))
		.catch((error) => response.send(error))
})

//update client http://localhost:8000/update/client?id=clientId&name=clientName&phone=clientPhone

router.get("/update/client", function (request, response) {
	const clientId = request.query["id"]
	const name = request.query["name"]
	const phone = request.query["phone"]

	db("client")
		.where("id", "=", clientId)
		.update({ name, phone })
		.then(() => response("Данные обновлены!"))
		.catch((error) => response.send(error))
})

module.exports = router
