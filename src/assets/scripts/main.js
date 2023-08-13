import './utils/burger'
import './utils/accordion'
import './utils/carousels'
import './utils/modals'

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
        }, 16)
    }

    scrollToTop()
})

window.addEventListener('scroll', function () {
    const btnUp = document.querySelector('.button-up')
    if (window.scrollY > 200) {
        btnUp.classList.add('active')
    } else {
        btnUp.classList.remove('active')
    }
})

const feedbacksItem = document.querySelectorAll('.feedbacks-item')

feedbacksItem.forEach((feedback) => {
    feedback.addEventListener('click', (event) => {
        const self = event.target

        if (self.classList.contains('feedbacks-item--active')) {
            self.classList.add('hide')

            feedback.querySelector('.feedbacks-item--text').classList.add('active')
        }
    })
})
console.log('connect')
