;(async () => {
    const burgerModule = await import('./utils/burger')
    burgerModule.default()

    const accordionModule = await import('./utils/accordion')
    accordionModule.default()

    const carouselsModule = await import('./utils/carousels')
    carouselsModule.default()

    const modalsModule = await import('./utils/modals')
    modalsModule.default()

    const lazyModule = await import('./utils/lazy')
    lazyModule.default()
})()

document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault()

        const targetId = this.getAttribute('href')
        const targetElement = document.querySelector(targetId)

        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop,
                behavior: 'smooth',
            })
        }
    })
})

document.querySelector('.button-up').addEventListener('click', function () {
    const scrollToTop = () => {
        const scrollStep = -window.scrollY / (1000 / 16)
        const scrollInterval = setInterval(() => {
            if (window.scrollY !== 0) {
                window.scrollBy(0, scrollStep)
            } else {
                clearInterval(scrollInterval)
            }
        }, 8)
    }

    scrollToTop()
})

window.addEventListener('scroll', function () {
    const btnUp = document.querySelector('.button-up')
    const header = document.querySelector('.app-header')

    if (window.scrollY > 200) {
        btnUp.classList.add('active')
        header.classList.add('active')
    } else {
        btnUp.classList.remove('active')
        header.classList.remove('active')
    }
})

const checkFeedbacksHeight = (feedback) => {
    const text = feedback.querySelector('.feedbacks-item--text span')
    const activator = feedback.querySelector('.feedbacks-item--active')

    const textHeight = window.innerWidth >= 768 ? 175 : 100

    if (feedback.querySelector('.feedbacks-item--text').classList.contains('active')) {
        return
    }

    if (text && text.offsetHeight > textHeight) {
        activator.classList.remove('hide')
        activator.classList.add('d-block')
    } else {
        activator.classList.remove('d-block')
        activator.classList.add('hide')
    }
}
const feedbacksItem = document.querySelectorAll('.feedbacks-item')

feedbacksItem.forEach((feedback) => {
    checkFeedbacksHeight(feedback)

    feedback.addEventListener('click', (event) => {
        const self = event.target

        if (self.classList.contains('feedbacks-item--active')) {
            self.classList.add('hide')

            feedback.querySelector('.feedbacks-item--text').classList.add('active')
        }
    })
})

window.addEventListener('resize', () => {
    feedbacksItem.forEach((feedback) => checkFeedbacksHeight(feedback))
})

console.log('connect')
