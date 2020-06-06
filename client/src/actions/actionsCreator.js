import * as types from "../constants"

export const setApplications = (applications) => ({
	type: types.SET_APPLICATION,
	payload: {
		applications,
	},
})

export const setServices = (services) => ({
	type: types.SET_SERVICES,
	payload: {
		services,
	},
})

export const setClients = (clients) => ({
	type: types.SET_CLIENTS,
	payload: {
		clients,
	},
})
