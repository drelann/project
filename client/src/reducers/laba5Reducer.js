import * as types from "../constants"

const initialState = {
	applications: [],
	services: [],
	clients: [],
}

export const laba5Reducer = (state = initialState, { type, payload }) => {
	switch (type) {
		case types.SET_APPLICATION: {
			const { applications } = payload
			return { ...state, applications }
		}
		case types.SET_SERVICES: {
			const { services } = payload
			return { ...state, services }
		}
		case types.SET_CLIENTS: {
			const { clients } = payload
			return { ...state, clients }
		}
		default:
			return state
	}
}
