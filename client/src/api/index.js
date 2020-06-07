import axios from "axios"
import { URL_LABA2 } from "../constants"

export const getApplications = async () => await axios.get(`${URL_LABA2}/select/application`)

export const getServices = () => axios.get(`${URL_LABA2}/select/service`)

export const getClients = () => axios.get(`${URL_LABA2}/select/client`)

export const changeApplication = async (id, date, client, services) =>
	await axios.get(`${URL_LABA2}/update/application?id=${id}&client=${client}&services=${services}`)

export const changeClient = async (id, name, phone) =>
	await axios.get(`${URL_LABA2}/update/client?id=${id}&name=${name}&phone=${phone}`)

export const changeService = async (id, name, price) =>
	await axios.get(`${URL_LABA2}/update/service?id=${id}&name=${name}&price=${price}`)

export const deleteApplication = async (id) =>
	await axios.get(`${URL_LABA2}/delete/application?id=${id}`)

export const deleteClient = async (id) => await axios.get(`${URL_LABA2}/delete/client?id=${id}`)

export const deleteService = async (id) => await axios.get(`${URL_LABA2}/delete/service?id=${id}`)

export const addApplication = async (clientId, services) =>
	await axios.get(`${URL_LABA2}/insert/application?client=${clientId}&services=${services}`)

export const addService = async (name, price) =>
	await axios.get(`${URL_LABA2}/insert/service?name=${name}&price=${price}`)

export const addClient = async (name, phone) =>
	await axios.get(`${URL_LABA2}/insert/client?name=${name}&phone=${phone}`)
