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
                const daily = body.daily.data[0]
                const dateMinTemp = new Date(daily.temperatureMinTime*1000)
                const dateMaxTemp = new Date(daily.temperatureMaxTime*1000)
                const hoursMin = dateMinTemp.getHours()
                const hoursMax = dateMaxTemp.getHours()
                const minMin = "0" + dateMinTemp.getMinutes()
                const minMax = "0" + dateMaxTemp.getMinutes()
                const formattedTimeMin = hoursMin + ':' + minMin.substr(-2)
                const formattedTimeMax = hoursMax + ':' + minMax.substr(-2)

                const data = {
                    summary: `It is currently ${daily.summary} It is ${curr.temperature} degrees out. There is ${curr.precipProbability*100}% chance of rain`,
                    temperature: curr.temperature,
                    precipProbability: curr.precipProbability*100,
                    minTemp: daily.temperatureMin,
                    minTempTime: formattedTimeMin,
                    maxTemp: daily.temperatureMax,
                    maxTempTime: formattedTimeMax,
                    icon: curr.icon
                }
                callback(undefined, data)
            }
        }
    })
}

module.exports = weather