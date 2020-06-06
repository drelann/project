import axios from "axios"
import { URL_LABA2 } from "../constants"

export const getApplications = async () => await axios.get(`${URL_LABA2}/select/application`)

export const getServices = () => axios.get(`${URL_LABA2}/select/service`)

export const getClients = () => axios.get(`${URL_LABA2}/select/client`)

export const changeClient = async (id, name, phone) =>
	await axios.get(`${URL_LABA2}/update/clients?id=${id}&name=${name}&phone=${phone}`)

export const changeService = async (id, name, price) =>
	await axios.get(`${URL_LABA2}/update/service?id=${id}&name=${name}&price=${price}`)

export const deleteClient = async (id) => await axios.get(`${URL_LABA2}/delete/client?id=${id}`)

export const deleteService = async (id) => await axios.get(`${URL_LABA2}/delete/service?id=${id}`)

export const addApplications = async (clientId, services) =>
	await axios.get(`${URL_LABA2}/insert/application?client=${clientId}&services=${services}`)
