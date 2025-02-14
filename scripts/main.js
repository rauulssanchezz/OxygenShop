const main = () => {
    try{
        toggleMenu()
        positionMenu()
        selectCurrency()
        handleContactForm()
        progressBar()
        modalForm()
        slider()
        returnButton()
    }catch(error){
        console.error(error)
    }
}

main()

function toggleMenu () {
    const toggleMenu = document.getElementById('toggle-menu')
    const spans = document.getElementsByClassName('toggle-span')
    const nav = document.getElementById('nav')

    toggleMenu.addEventListener('click', () => {
        for(let i = 0; i < spans.length; i++){
            spans[i].style.display = spans[i].style.display === 'none' ? 'block' : 'none'
        }
        
        if(toggleMenu.style.backgroundImage.includes('close.png')){
            toggleMenu.style.backgroundImage = 'none'
        }else{
            toggleMenu.style.backgroundImage = 'url(./assets/close.png)'
            toggleMenu.style.backgroundSize = 'contain'
            toggleMenu.style.backgroundRepeat = 'no-repeat'
            toggleMenu.style.backgroundPosition = 'center'
        }

        toggleMenu.style.backgroundSize = 'contain'
        toggleMenu.style.width = '2rem'
        toggleMenu.style.marginTop= toggleMenu.style.marginTop === '0.5rem' ? '0' : '0.5rem'
        nav.style.display = nav.style.display === 'block' ? 'none' : 'block'
    })
}

function positionMenu () {
    const lists = document.getElementsByClassName('nav-li')
    const returnButton = document.getElementById('return-button')

    for(let i = 0; i < lists.length; i++){
        lists[i].addEventListener('click', () => {
            for(let j = 0; j < lists.length; j++){
                lists[j].style.border = 'none'
                lists[j].style.fontWeight = 'normal';
                lists[j].style.color = '#A5A5A5';
            }

            lists[i].style.borderBottom = '3px solid #08A6E4';
            lists[i].style.fontWeight = 'bold';
            lists[i].style.color = 'black';
        })
    }

    returnButton.addEventListener('click', () => {
        for(let i = 0; i < lists.length; i++){
            lists[i].style.border = 'none'
        }
        lists[0].style.borderBottom = '2px solid #08A6E4'
    })
}

async function handleContactForm () {
    const nameInput = document.getElementById('name')
    const emailInput = document.getElementById('email')
    const contactInputButton = document.getElementById('contact-input-button')
    const checkBoxPrivacity = document.getElementById('privacity')
    const nameError = document.getElementById('name-error')
    const emailError = document.getElementById('email-error')

    let name = ''
    let email = ''
    let check = false

    const emailRegex = new RegExp(
    '^[a-zA-Z0-9._%+-]+@[a-zAZ0-9.-]+\.[a-zA-Z]{2,}$'
    )

    contactInputButton.addEventListener('click', async () => {
        name = nameInput.value
        email = emailInput.value
        check = checkBoxPrivacity.checked

        nameInput.style.borderBottom = '2px solid gray'
        emailInput.style.borderBottom = '2px solid gray'
        checkBoxPrivacity.style.border = '2px solid gray'

        if(name.length > 2 && name. length < 100 && emailRegex.test(email) && check){
            const objBody = {
                name: name,
                email: email,
                privacity: check
            }

            await fetchFormData(objBody)

            alert('Form sent successfully')
            nameInput.value = ''
            emailInput.value = ''
            nameInput.style.borderBottom = '2px solid gray'
            emailInput.style.borderBottom = '2px solid gray'
            checkBoxPrivacity.style.border= '2px solid gray'

        }else if((name === '' || (name <= 2 && name >= 100)) && (email === '' || !email.match(emailRegex)) && !check){
            alert('Name is required and have to be between 2 and 100 characters\nEmail is required and have to be a valid email\nYou have to accept the privacity policy')
            nameInput.style.borderBottom ='2px solid red'
            nameError.style.display = 'block'

            emailInput.style.borderBottom ='2px solid red'
            emailError.style.display = 'block'

            checkBoxPrivacity.style.border ='2px solid red'

            return 
        }else if((name === '' || (name <= 2 && name >= 100)) && (email === '' || !email.match(emailRegex))){
            checkBoxPrivacity.style.border= '2px solid gray'

            alert('Name is required and have to be between 2 and 100 characters\nEmail is required and have to be a valid email')
            nameInput.style.borderBottom ='2px solid red'
            nameError.style.display = 'block'

            emailInput.style.borderBottom ='2px solid red'
            emailError.style.display = 'block'

            return
        }else if((name === '' || (name <= 2 && name >= 100)) && !check){
            emailInput.style.borderBottom = '2px solid gray'
            emailError.style.display = 'none'

            alert('Name is required and have to be between 2 and 100 characters\nYou have to accept the privacity policy')
            nameInput.style.borderBottom ='2px solid red'
            nameError.style.display = 'block'

            checkBoxPrivacity.style.border ='2px solid red'

            return 
        }else if((email === '' || !email.match(emailRegex)) && !check){
            nameInput.style.borderBottom = '2px solid gray'
            nameError.style.display = 'none'

            alert('Email is required and have to be a valid email\nYou have to accept the privacity policy')
            emailInput.style.borderBottom ='2px solid red'
            emailError.style.display = 'block'

            checkBoxPrivacity.style.border ='2px solid red'

            return 
        }else if(name === '' || (name <= 2 && name >= 100)){
            emailInput.style.borderBottom = '2px solid gray'
            emailError.style.display = 'none'
            checkBoxPrivacity.style.border= '2px solid gray'

            alert('Name is required and have to be between 2 and 100 characters')
            nameInput.style.borderBottom ='2px solid red'
            nameError.style.display = 'block'
            return
            
        }else if(email === '' || !email.match(emailRegex)){
            nameInput.style.borderBottom = '2px solid gray'
            nameError.style.display = 'none'
            checkBoxPrivacity.style.border= '2px solid gray'

            alert('Email is required and have to be a valid email')
            emailInput.style.borderBottom ='2px solid red'
            emailError.style.display = 'block'
            return

        }else if(!check){
            nameInput.style.borderBottom = '2px solid gray'
            nameError.style.display = 'none'
            emailInput.style.borderBottom = '2px solid gray'
            emailError.style.display = 'none'

            alert('You have to accept the privacity policy')
            checkBoxPrivacity.style.border ='2px solid red'
            return

        }
    })
}

function progressBar() {
    try{
        window.addEventListener('scroll', () => {
            const progressBar = document.getElementById('progress-bar')
    
            const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight
    
            const scrollTop = document.documentElement.scrollTop
    
            const progress = (scrollTop / scrollHeight) * 100
    
            progressBar.style.width = `${progress}%`
    
        })
    }catch(error){
        console.error(error)
    }
}

async function selectCurrency () {
    const select = document.getElementById('currency-select')
    const priceBasic = document.getElementById('price-basic')
    const pricePro = document.getElementById('price-professional')
    const pricePremium = document.getElementById('price-premium')

    let currency = select.value

    const rawCurrencies = await getCurrencies(currency)
    const currencies = rawCurrencies[0][currency]

    const basicValue = Number.parseInt(priceBasic.textContent.slice(1,priceBasic.textContent.length))
    const proValue = Number.parseInt(pricePro.textContent.slice(1,pricePro.textContent.length))
    const premiumValue = Number.parseInt(pricePremium.textContent.slice(1,pricePremium.textContent.length))

    const currencyChange = []

    currencyChange.push(currencies['eur'])
    currencyChange.push(currencies['gbp'])

    const values = {
        usdBasicValue: basicValue,
        usdProValue: proValue,
        usdPremiumValue: premiumValue,
        eurBasicValue: Math.round(basicValue * currencyChange[0]),
        eurProValue: Math.round(proValue * currencyChange[0]),
        eurPremiumValue: Math.round(premiumValue * currencyChange[0]),
        gbpBasicValue: Math.round(basicValue * currencyChange[1]),
        gbpProValue: Math.round(proValue * currencyChange[1]),
        gbpPremiumValue: Math.round(premiumValue * currencyChange[1])
    }

    const currenciesSymbols = {
        eur: '€',
        usd: '$',
        gbp: '£'
    }

    select.addEventListener('change', () => {
        previousCurrency = currency
        currency = select.value

        const selectedCurrency = [`${currency}BasicValue`, `${currency}ProValue`, `${currency}PremiumValue`]

        priceBasic.textContent = `${currenciesSymbols[currency]}${values[selectedCurrency[0]]}`
        pricePro.textContent = `${currenciesSymbols[currency]}${values[selectedCurrency[1]]}`
        pricePremium.textContent = `${currenciesSymbols[currency]}${values[selectedCurrency[2]]}`
    })   
}

async function getCurrencies (currency) {
    let currencies = []
    await fetch(`https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/${currency}.json`)
    .then((response) => response.json())
    .then((data) => currencies.push(data))
    .catch((error) => console.error(error))

    return currencies
}

function modalForm () {
    const modal = document.getElementById('modal')
    const closeModal = document.getElementById('close-modal')
    const emailError = document.getElementById('modal-email-error')
    modal.showModal()

    const modalGreet = document.getElementById('modal-greet')

    const emailInput = document.getElementById('email-newsletter')
    const submitButton = document.getElementById('submit-newsletter')

    let email = ''

    submitButton.addEventListener('click', async () => {
        email = emailInput.value

        const emailRegex = new RegExp(
            '^[a-zA-Z0-9._%+-]+@[a-zAZ0-9.-]+\.[a-zA-Z]{2,}$'
        )

        if(email === '' || !email.match(emailRegex)){
            alert('Email is required and have to be a valid email')
            emailInput.style.borderBottom ='2px solid red'
            emailError.style.display = 'block'
            return
        }

        const objBody = {
            email: email
        }

        const response = await fetchFormData(objBody)
        console.log({response})

        if(response){
            emailInput.value = ''
            modal.close()

            setTimeout(() => {
                modalGreet.showModal()
                setTimeout(() => {
                    modalGreet.close()
                },1000)
            },500)
        }
    })

    closeModal.addEventListener('click', () => {
        modal.close()
    })

    window.addEventListener('click', (event) => {
        if(event.target === modal){
            modal.close()
        }
    })

    window.addEventListener('keydown', (event) => {
        if(event.key === 'Escape'){
            modal.close()
        }
    })

    window.addEventListener('scroll', () => {
        if(document.documentElement.scrollTop > document.documentElement.scrollTop * 0.25){
            modal.close()
        }
    })
}

async function fetchFormData (objBody) {
    let response = ''
    await fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        body: JSON.stringify({
            objBody
        }),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        }
    }).then((response) => response.json())
    .then((json) => response = json)
    .catch((error) => console.error(error))

    return response
}

function slider () {
    const imgs = document.getElementsByClassName('slider-img')
    const imgIndicatorContainer = document.getElementById('img-indicator-container')
    const back = document.getElementById('back')
    const next = document.getElementById('next')

    for(let i = 0; i < imgs.length; i++){
        const imgIndicator = document.createElement('div')
        imgIndicator.classList.add('img-indicator')
        imgIndicatorContainer.appendChild(imgIndicator)
    }

    const imgsIndicators = document.getElementsByClassName('img-indicator')

    console.log('slider', {imgs})

    imgs[0].style.display = 'block'
    imgsIndicators[0].style.background = 'rgb(185, 183, 183)'

    let i = 0

    const loop = () => {
        setInterval(() => {
            imgs[i].style.display = 'none'
            imgsIndicators[i].style.background = 'rgba(185, 183, 183, 0.586)'
            const shift = (i + 1) % imgs.length
            imgs[shift].style.display = 'block'
            imgsIndicators[shift].style.background = 'rgb(185, 183, 183)'
            i = (i + 1) % imgs.length
        }, 2500)
    }

    setTimeout(() => loop(0), 2500)

    back.addEventListener('click', () => {
        imgs[i].style.display = 'none'
        imgsIndicators[i].style.background = 'rgba(185, 183, 183, 0.586)'
        const shift = ((i - 1) + imgs.length) % imgs.length
        imgs[shift].style.display = 'block'
        imgsIndicators[shift].style.background = 'rgb(185, 183, 183)'
        i = ((i - 1) + imgs.length) % imgs.length 
    })

    next.addEventListener('click', () => {
        imgs[i].style.display = 'none'
        imgsIndicators[i].style.background = 'rgba(185, 183, 183, 0.586)'
        const shift = (i + 1) % imgs.length
        imgs[shift].style.display = 'block'
        imgsIndicators[shift].style.background = 'rgb(185, 183, 183)'
        i = (i + 1) % imgs.length
    })
}

function returnButton () {
    const returnButton = document.getElementById('return-button')
    window.onscroll = () => {
        if(document.documentElement.scrollTop > 400){
            returnButton.style.display = 'block'
        }else{
            returnButton.style.display = 'none'
        }
    }
    returnButton.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        })
    })
}