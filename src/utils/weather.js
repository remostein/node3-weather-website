const request = require('request')

const weather = (long, lat, callback) => {
     
    const dsToken = 'a3308c6077c75c018b23ced7f51a490f'
    const dsurl = `https://api.darksky.net/forecast/${dsToken}/${lat},${long}?units=si`

    request({url:dsurl, json:true}, (err, {body}) => {
        if (err) {
            callback('Unable to connect to weather services', undefined)
        } else {
            if(body.error) {
                callback(body.error, undefined)
            } else {
                const curr = body.currently
                const data = `It is currently ${body.daily.data[0].summary} It is ${curr.temperature} degrees out. There is ${curr.precipProbability*100}% chance of rain`
                callback(undefined, data)
            }
        }
    })
}

module.exports = weather