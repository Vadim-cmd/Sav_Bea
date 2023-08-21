export default function initializeBurger() {
    const burger = document.querySelector('.app-burger')
    const closeBruger = document.querySelector('.header-navbar--close')
    const navbar = document.querySelector('.header-navbar')

    const closeNavbar = () => {
        navbar.removeAttribute('style')
    }

    burger.addEventListener('click', () => {
        navbar.setAttribute('style', 'transform: translateX(0)')
    })

    closeBruger.addEventListener('click', () => {
        closeNavbar()
    })

    document.addEventListener('click', (event) => {
        if (!navbar.contains(event.target) && !burger.contains(event.target)) {
            closeNavbar()
        }
    })
}
