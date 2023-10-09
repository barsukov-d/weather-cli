import { getKeyValue, TOKEN_DICTIONARY } from './storage.service.js'
import axios from 'axios'

const getWeather = async (city) => {
	const token = process.env.TOKEN ?? (await getKeyValue(TOKEN_DICTIONARY.token))
	if (!token) {
		throw new Error('Token is required')
	}
	const { data } = await axios.get('https://api.openweathermap.org/data/2.5/weather', {
		params: {
			q: city,
			appid: token,
			units: 'metric',
		},
	})

	return data
}

export { getWeather }
