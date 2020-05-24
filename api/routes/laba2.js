var express = require("express")
var db = require("../database/index")
var router = express.Router()

router.get("/select", function (request, response) {
	const tableName = request.query.table

	try {
		if (tableName === "application") {
			db({
				clt: "client",
				app: tableName,
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
		} else {
			db(tableName)
				.select()
				.orderBy("id")
				.then((data) => response.send(data))
		}
	} catch (error) {
		response.send(error)
	}
})

router.get("/insert", function (request, response) {})

router.get("/delete", function (request, response) {})

router.get("/update", function (request, response) {})

module.exports = router
