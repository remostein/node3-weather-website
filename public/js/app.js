console.log('Client side javascript is working..')


const weatherForm = document.querySelector('form')
const inputValue = document.querySelector('input')
const outStatus = document.getElementById('status')
const outLocation = document.getElementById('wlocation')
const outForecast = document.getElementById('wforecast')
const outTemp = document.getElementById('wtemp')
const outIcon = document.getElementById('wicon')
const outHighTemp = document.getElementById('hightemp')
const outLowTemp = document.getElementById('lowtemp')
const outHighTempTime = document.getElementById('hightemp-time')
const outLowTempTime =document.getElementById('lowtemp-time')
const dateTime = document.getElementById('date-time')
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];


const ElementsToClear = [outTemp, outLocation, outForecast, outHighTemp, outLowTemp, outHighTempTime, outLowTempTime, dateTime]


weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const location = inputValue.value
    outStatus.style.color = '#333'
    outStatus.innerHTML = "Retrieving information from server..."
    clear()

    fetch('/weather?address=' + location).then((response) => {
        response.json().then((data) => {
            if (data.err) {
                outStatus.style.color = '#F00'
                outStatus.innerHTML = `Error: ${data.err}`
                outLocation.innerHTML = ''
            } else {
                outStatus.innerHTML = ''
                outForecast.style.color = '#333'
                outLocation.innerHTML = `Forecast for: ${data.location}`
                outForecast.innerHTML = data.data.summary
                outTemp.innerHTML = "º" + data.data.temperature
                outIcon.style.display = 'inline'
                outIcon.src = "/img/wicons/" + data.data.icon + ".png"
                outHighTemp.innerHTML = `Highest: º${data.data.maxTemp}`
                outLowTemp.innerHTML = `Lowest: º${data.data.minTemp}`
                outHighTempTime.innerHTML = `at: ${data.data.maxTempTime}`
                outLowTempTime.innerHTML = `at: ${data.data.minTempTime}`
                const tempDateTime = new Date()
                const tempDay = "0" + tempDateTime.getDay()
                const tempMonth = tempDateTime.getMonth()
                const tempYear = tempDateTime.getFullYear()
                const tempTime = tempDateTime.toTimeString().split(' ')
                const finalDateTime = `${tempDay} ${months[tempMonth]} ${tempYear} ${tempTime[0]}`
                dateTime.innerHTML = finalDateTime
                console.log(data)
            }
            
        })
    })

})

const clear = () => {
    ElementsToClear.forEach(el => {
        el.innerHTML = ''
    })
    outIcon.style.display = 'none'
}