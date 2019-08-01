weatherform.addEventListener('submit', (e) => {
    e.preventDefault()
    const location = search.value
    messageone.textcontent = 'loading..'
    messageone.textcontent = ''

    fetch('http://localhost:3000/weather?address=' + location).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                 messageone.textcontent = data.error
            } else {
                 messageone.textcontent = data.forecast
                 messageone.textcontent = ''
            }

        })
    })

})
