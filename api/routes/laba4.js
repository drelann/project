var express = require("express")
const rp = require("request-promise")
var router = express.Router()

router.get("/answer", (request, response) => {
	rp({
		method: "GET",
		uri: "http://www.mocky.io/v2/5c7db5e13100005a00375fda",
		json: true,
	})
		.then((data) => {
			const answer = { result: data.result.split(" ").join("_") }
			response.send(JSON.stringify(answer))
		})
		.catch((error) => {
			response.send(error)
		})
})

module.exports = router
