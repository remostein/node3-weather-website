console.log('Client side javascript is working..')

// fetch('http://localhost:3000/weather?address=boston').then((response) => {
//     response.json().then((data) => {
//         if (data.err) {
//             console.log(data.err)
//         } else {
//             console.log(data)
//         }
        
//     })
// })

const weatherForm = document.querySelector('form')
const inputValue = document.querySelector('input')
const outLocation = document.getElementById('wlocation')
const outForcast = document.getElementById('wforcast')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const location = inputValue.value
    outLocation.innerHTML = "Retrieving information from server..."

    fetch('http://localhost:3000/weather?address=' + location).then((response) => {
        response.json().then((data) => {
            if (data.err) {
                outLocation.style.color = '#F00'
                console.log(data.err)
                outLocation.innerHTML = `Error: ${data.err}`
                outForcast.innerHTML = ''
            } else {
                outLocation.style.color = '#000'
                outLocation.innerHTML = `Address: ${data.location}`
                outForcast.innerHTML = `Forcast: ${data.forcast}`
                console.log(data)
            }
            
        })
    })

})