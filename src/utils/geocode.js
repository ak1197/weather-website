const request = require('request')
const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + address + '.json?access_token=pk.eyJ1IjoiYWsxMTk3IiwiYSI6ImNrZDcxdTk4ODBuY20ydHJhaHdrNTJrajEifQ.NGckElDSz6aTs1I0bxf7Bw'
    request({ url, json: true }, (error, { body }={}) => {
        if (error) {
            callback('unable to connect to the network', undefined)
        }
        else if (body.features.length === 0) {
            callback('tried search not found', undefined)
        }
        else {
            callback(undefined, {
                Latitude: body.features[0].center[1],
                Longitude: body.features[0].center[0],
                Location: body.features[0].place_name
            })
        }
    })
}

module.exports = geocode