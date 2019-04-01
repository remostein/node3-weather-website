const request = require('request')

const geocode = (location, callback) => {
    const mbToken = 'pk.eyJ1IjoicmVtb3N0ZWluIiwiYSI6ImNqdDhzOXJzaTAxZWY0M3F0dDE4d294cm8ifQ.pc_pujd2z-9ClMdvr0jzCw'

    const mburl = `https://api.mapbox.com/geocoding/v5/mapbox.places/${location}.json?access_token=${mbToken}&limit=1`

    request({url:mburl, json:true}, (err, {body}) => {
        if(err) {
            callback('Unable to connect to weather services', undefined)
        } else if(!body.features || body.features.length === 0){
            callback('Could not find location', undefined)
        } else {
            const data = {
                Longitude: body.features[0].center[0],
                Latitude: body.features[0].center[1],
                Name: body.features[0].place_name
            }
            callback(undefined, data)
        }       
    })
}

module.exports = geocode