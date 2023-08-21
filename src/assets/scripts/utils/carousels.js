export default async function initializeCarousel() {
    const Swiper = await import('swiper')

    const certyficationModalCarousel = document.createElement('div')

    const certyficationItems = document.querySelectorAll('.certyfication-item')

    let certyficationItemsStr = ''

    certyficationItems.forEach((item) => {
        const img = item.querySelector('img').src

        certyficationItemsStr += `
            <div class="certyfication-item my-auto swiper-slide">
                <img
                    src="${img}"
                    alt="certyfication-1"
                />
            </div>
        `
    })

    certyficationModalCarousel.setAttribute('class', 'footer-modal-window certyfication-modal')

    certyficationModalCarousel.innerHTML = `
        <div class="inner radius-25 px-4 py-13 px-md-11 py-md-12" style="max-width: 728px">
            <div class="window-close">
                <svg width="24" height="24">
                    <use xlink:href="./icons/icons-sprite.svg#icon-close" stroke="#EF628F" />
                </svg>
            </div>

            <div class="certyficationModal swiper">
                <div class="swiper-wrapper">
                    ${certyficationItemsStr}
                </div>
                <div class="swiper-actions swiper-button-next"></div>
                <div class="swiper-actions swiper-button-prev"></div>
            </div>
        </div>
    `

    document.body.append(certyficationModalCarousel)

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

        certyficationModal: {
            slidesPerView: 1,
            spaceBetween: 28,
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

        const carousel = new Swiper.default(`.${key}`, seettings)

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

            carousel.on('slideChange', () => {
                swiperArrows.forEach((a) => a.classList.remove('disabled'))

                if (carousel.isEnd && arrow.classList.contains('swiper-button-next')) {
                    arrow.classList.add('disabled')
                }

                if (carousel.isBeginning && arrow.classList.contains('swiper-button-prev')) {
                    arrow.classList.add('disabled')
                }
            })
        })
    }
}
