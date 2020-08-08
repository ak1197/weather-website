const request = require('request')

const forecast = (lat, lon, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=5d752d3bc26962f2b548d0b3742bc0b5&query=' + lat + ',' + lon
    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('unable to connect to the network', undefined)
        }
        else if (body.error) {
            callback('Tried location not found', undefined)
        }
        else {
            callback(undefined, {
                Temperature: body.current.temperature,
                RainChance: body.current.precip,
                image: body.current.weather_icons[0],
                description: body.current.weather_descriptions[0]
            })
        }
    })
}

module.exports = forecast