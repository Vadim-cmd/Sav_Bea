import generateContent from '../courses/components'
import courses from '../courses/items'

export default function initializeBurger() {
    function removeSlashes(inputString) {
        return inputString.replace(/\//g, '')
    }

    let locale = !removeSlashes(window.location.pathname)
        ? 'ua'
        : removeSlashes(window.location.pathname)

    console.log(locale)

    const modal = () => {
        let modalBlock = null

        return {
            animate(modal) {
                const timeout = setTimeout(() => {
                    modal.classList.add('visible')
                    clearTimeout(timeout)
                }, 100)
            },
            create(trigger) {
                modalBlock = document.createElement('div')
                modalBlock.classList.add('modal-block')
                modalBlock.classList.add(trigger)

                modalBlock.innerHTML = generateContent(courses[locale][trigger], trigger)

                document.body.style.overflow = 'hidden'

                document.body.append(modalBlock)

                this.animate(modalBlock)

                modalBlock.addEventListener('click', (event) => {
                    event.stopPropagation()

                    if (event.target.className.includes('course-header--close')) {
                        this.destroy()
                    }
                })
            },

            destroy() {
                if (modalBlock && modalBlock.parentNode) {
                    modalBlock.classList.remove('visible')

                    const timeout = setTimeout(() => {
                        modalBlock.parentNode.removeChild(modalBlock)
                        modalBlock = null
                        document.body.removeAttribute('style')

                        clearTimeout(timeout)
                    }, 200)
                }
            },
        }
    }

    const openModalButtons = document.querySelectorAll('.open-modal')

    openModalButtons.forEach((button) => {
        button.addEventListener('click', () => {
            const trigger = button.dataset.modal

            const modalInstance = modal()

            modalInstance.create(trigger)
        })
    })

    const openMiniModalsButtons = document.querySelectorAll('.open-footer-modal')

    openMiniModalsButtons.forEach((button) => {
        button.addEventListener('click', () => {
            const trigger = button.dataset.modal

            const modal = document.querySelector(`.${trigger}`)

            modal.classList.add('visible')

            const inner = modal.querySelector('.inner')
            const closeButton = modal.querySelector('.window-close')

            inner.addEventListener('click', (event) => event.stopPropagation())

            modal.addEventListener('click', (event) => {
                event.stopPropagation()

                modal.classList.remove('visible')
            })

            closeButton.addEventListener('click', () => {
                modal.classList.remove('visible')
            })
        })
    })
}
