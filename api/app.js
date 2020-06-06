var createError = require("http-errors")
var express = require("express")
var path = require("path")
const cors = require("cors")
var cookieParser = require("cookie-parser")
var logger = require("morgan")

var laba1Router = require("./routes/laba1")
var laba2Router = require("./routes/laba2")
var laba4Router = require("./routes/laba4")

var app = express()

// view engine setup
app.set("views", path.join(__dirname, "views"))
app.set("view engine", "jade")

app.use(cors())
app.use(logger("dev"))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, "public")))

app.use("/laba1", laba1Router)
app.use("/laba2", laba2Router)
app.use("/laba4", laba4Router)

// catch 404 and forward to error handler
app.use(function (req, res, next) {
	next(createError(404))
})

// error handler
app.use(function (err, req, res, next) {
	// set locals, only providing error in development
	res.locals.message = err.message
	res.locals.error = req.app.get("env") === "development" ? err : {}

	// render the error page
	res.status(err.status || 500)
	res.render("error")
})

module.exports = app
