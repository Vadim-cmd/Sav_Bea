'use strict'

import Swiper from 'swiper'

const sliders = {
    feedbacks: {
        slidesPerView: 2.3,
        spaceBetween: 28,

        breakpoints: {
            320: {
                slidesPerView: 1.1,
                spaceBetween: 12,
            },

            540: {
                slidesPerView: 1.5,
                spaceBetween: 12,
            },

            768: {
                slidesPerView: 1.3,
                spaceBetween: 30,
            },
            1200: {
                slidesPerView: 2.3,
                spaceBetween: 28,
            },

            1540: {
                slidesPerView: 3,
                spaceBetween: 28,
            },
        },
    },

    courses: {
        slidesPerView: 1.3,
        spaceBetween: 40,

        breakpoints: {
            320: {
                slidesPerView: 1,
                spaceBetween: 12,
            },
            768: {
                slidesPerView: 2,
                spaceBetween: 26,
            },
            1200: {
                slidesPerView: 2.5,
                spaceBetween: 40,
            },
        },
    },

    cases: {
        slidesPerView: 1.3,
        spaceBetween: 40,

        breakpoints: {
            320: {
                slidesPerView: 1.3,
                spaceBetween: 20,
            },
            768: {
                slidesPerView: 1.3,
                spaceBetween: 26,
            },
            1200: {
                slidesPerView: 1.3,
                spaceBetween: 40,
            },
        },
    },

    prices: {
        slidesPerView: 1.1,
        spaceBetween: 40,

        breakpoints: {
            320: {
                slidesPerView: 1.1,
                spaceBetween: 40,
            },
            992: {
                slidesPerView: 3,
                spaceBetween: 46,
            },
        },
    },

    certyfication: {
        slidesPerView: 4,
        spaceBetween: 28,

        breakpoints: {
            320: {
                slidesPerView: 1.2,
                spaceBetween: 12,
            },
            768: {
                slidesPerView: 2.8,
                spaceBetween: 28,
            },
            1200: {
                slidesPerView: 3.3,
                spaceBetween: 28,
            },

            1200: {
                slidesPerView: 3.3,
                spaceBetween: 28,
            },
        },
    },
}

for (const key in sliders) {
    const generalOptions = {
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
    }
    const seettings = Object.assign(sliders[key], generalOptions)

    const carousel = new Swiper(`.${key}`, seettings)

    const wrapper = document.querySelector(`.${key}`)

    const swiperArrows = wrapper.querySelectorAll('.swiper-actions')

    swiperArrows.forEach((arrow) => {
        if (carousel.isBeginning && arrow.classList.contains('swiper-button-prev')) {
            arrow.classList.add('disabled')
        }

        if (carousel.isEnd && arrow.classList.contains('swiper-button-next')) {
            arrow.classList.add('disabled')
        }

        arrow.addEventListener('click', (event) => {
            if (event.target.classList.contains('swiper-button-prev')) {
                carousel.slidePrev()
            } else {
                carousel.slideNext()
            }
        })
    })

    carousel.on('slideChange', () => {
        swiperArrows.forEach((a) => a.classList.remove('disabled'))

        if (carousel.isEnd && arrow.classList.contains('swiper-button-next')) {
            arrow.classList.add('disabled')
        }

        if (carousel.isBeginning && arrow.classList.contains('swiper-button-prev')) {
            arrow.classList.add('disabled')
        }
    })
}
