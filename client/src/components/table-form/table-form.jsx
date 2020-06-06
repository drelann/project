import React from "react"
import { makeStyles } from "@material-ui/core/styles"
import Table from "@material-ui/core/Table"
import TableBody from "@material-ui/core/TableBody"
import TableCell from "@material-ui/core/TableCell"
import TableContainer from "@material-ui/core/TableContainer"
import TableHead from "@material-ui/core/TableHead"
import TableRow from "@material-ui/core/TableRow"
import Paper from "@material-ui/core/Paper"

const useStyles = makeStyles({
	table: {
		minWidth: 500,
	},
	container: {
		margin: "10px 0",
	},
})

const TableForm = ({ header, data }) => {
	const isEmpty = data?.length === 0
	const headData = isEmpty ? null : Object.keys(data[0])
	const classes = useStyles()

	return (
		<div className={classes.container}>
			<h2>{header}</h2>
			{isEmpty ? null : (
				<TableContainer component={Paper}>
					<Table className={classes.table} aria-label='simple table'>
						<TableHead>
							<TableRow>
								{headData.map((text, index) => (
									<TableCell key={index}>{text}</TableCell>
								))}
							</TableRow>
						</TableHead>
						<TableBody>
							{data.map((item, i) => (
								<TableRow key={i}>
									{Object.values(item).map((value, j) => (
										<TableCell key={`${i}-${j}`}>{value}</TableCell>
									))}
								</TableRow>
							))}
						</TableBody>
					</Table>
				</TableContainer>
			)}
		</div>
	)
}

export default TableForm
