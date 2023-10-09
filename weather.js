import { getArgs } from './helpers/args.js'
import { getWeather } from './services/api.service.js'
import { getIcon } from './services/icons.service.js'
import { printHelp, printSuccess, printError, printWeather } from './services/log.service.js'
import { saveKeyValue, getKeyValue, TOKEN_DICTIONARY } from './services/storage.service.js'

const saveToken = async (token) => {
	if (!token.length) {
		printError('Token is required')
		return
	}
	try {
		await saveKeyValue(TOKEN_DICTIONARY.token, token)
		printSuccess('Token saved')
	} catch (error) {
		printError(error.message)
	}
}

const setCity = async (city) => {
	try {
		await saveKeyValue(TOKEN_DICTIONARY.city, city)
		printSuccess('City saved')
	} catch (error) {
		printError('City not found')
	}
}

const saveCity = async (city) => {
	if (!city.length) {
		printError(error.message)
		return
	}

	try {
		await getWeather(city)
		await setCity(city)
	} catch (error) {
		printError('City not found')
	}
}

const getForecast = async () => {
	try {
		const weather = await getWeather(process.env.CITY ?? (await getKeyValue(TOKEN_DICTIONARY.city)))
		printWeather(weather, getIcon(weather.weather[0].icon))
	} catch (error) {
		if (error?.response?.status === 404) {
			printError('City not found')
			return
		} else if (error?.response?.status === 401) {
			printError('Invalid token')
			return
		} else {
			return printError(error.message)
		}
	}
}

const initCLI = () => {
	const args = getArgs(process.argv)

	if (args.h) {
		// Print help
		printHelp()
	}
	if (args.s) {
		// Save city
		return saveCity(args.s)
	}
	if (args.t) {
		// Save token
		return saveToken(args.t)
	}
	getForecast()
	// Get weather
}

initCLI()
