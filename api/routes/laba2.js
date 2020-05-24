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
			client: "clt.name",
		})
		.where("app.client_id", "=", db.ref("clt.id"))
		.orderBy("app.id")
		.then((applications) => {
			db({ srv: "service", sfa: "services_app" })
				.select({
					applicationId: "sfa.application_id",
					service: "srv.name",
				})
				.where("sfa.service_id", "=", db.ref("srv.id"))
				.orderBy("sfa.application_id")
				.then((result) => {
					const data = applications.map((application) => {
						const services = []
						for (let i = 0; i < result.length; i++) {
							if (result[i].applicationId === application.id) {
								services.push(result[i].service)
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

//insert client http://localhost:8000/insert/client?name=clientName&phone=clientPhone

router.get("/delete/application?id=applicationId", function (request, response) {})

router.get("/update", function (request, response) {})

module.exports = router
