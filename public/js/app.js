const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne =document.querySelector('#message-1')
const messageTwo   =document.querySelector('#message-2')
const weatherImage = document.querySelector('img')
const description=document.querySelector('#description')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const Location = search.value
    messageOne.textContent = 'Loading...'
    messageTwo.textContent =''
    description.textContent=''
    weatherImage.src=''
    fetch('/weather?address=' + Location).then((resp) => {
        resp.json().then((data) => {
            console.log(data)
            if (data.error) {
              return  messageOne.textContent = data.error
            }
            messageOne.textContent = 'Query Location : '+data.Location
            description.textContent='Weather : '+data.ForeCast.description
            weatherImage.src = data.ForeCast.image
            messageTwo.textContent ='Description: Here temperature is '+ data.ForeCast.Temperature + ' C and rain chance is ' + data.ForeCast.RainChance 
        })
    })
})