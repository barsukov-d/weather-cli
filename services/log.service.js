import chalk from 'chalk'
import dedent from 'dedent-js'
import { getIcon } from './icons.service.js'

const printError = (error) => {
	console.log(chalk.bgRed(' ERROR ') + ' ' + error)
}

const printSuccess = (message) => {
	console.log(chalk.bgGreen(' SUCCESS ') + ' ' + message)
}

const printHelp = () => {
	console.log(
		dedent`
        ${chalk.bgCyan('HELP:')}
    
        without args, get weather
        
        -s [CITY] Select city
        -h Print help
        -t [API_KEY] Set token
        `
	)
}

const printWeather = (weather, icon) => {
	console.log(
		dedent`
        ${chalk.bgMagenta('WEATHER:')}
        City: ${weather.name} - ${weather.weather[0].description} ${icon} 
        Temperature: ${weather.main.temp}°C
        Feels like: ${weather.main.feels_like}°C
        Humidity: ${weather.main.humidity}%
        Pressure: ${weather.main.pressure}hPa
        Sunrise: ${new Date(weather.sys.sunrise * 1000).toLocaleTimeString()}
        Sunset: ${new Date(weather.sys.sunset * 1000).toLocaleTimeString()}
        `
	)
}

export { printError, printSuccess, printHelp, printWeather }
