import React from "react"
import { Switch, Route, Redirect } from "react-router-dom"

function App() {
	return (
		<Switch>
			<Route exact path='/'>
				<Redirect to='/laba5' />
			</Route>

			<Route path='/laba5'></Route>

			<Route path='/laba6'></Route>

			<Route path='*'>
				<h1>Error</h1>
			</Route>
		</Switch>
	)
}

export default App
