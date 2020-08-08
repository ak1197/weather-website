const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne =document.querySelector('#message-1')
const messageTwo   =document.querySelector('#message-2')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const Location = search.value
    messageOne.textContent = 'Loading...'
    messageTwo.textContent =''
    fetch('/weather?address=' + Location).then((resp) => {
        resp.json().then((data) => {
            console.log(data)
            if (data.error) {
              return  messageOne.textContent = data.error
            }
            messageOne.textContent = data.Location
            messageTwo.textContent ='Here temperature is '+ data.ForeCast.Temperature + ' C and rain chance is ' + data.ForeCast.RainChance 
        })
    })
})