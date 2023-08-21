export default function initializeLazy() {
    const images = document.querySelectorAll('img[data-src]')
    const iframes = document.querySelectorAll('iframe[data-src]')

    const observerImages = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                const image = entry.target
                const src = image.getAttribute('data-src')
                image.setAttribute('src', src)
                image.removeAttribute('data-src')
                observer.unobserve(image)
            }
        })
    })

    images.forEach((image) => {
        observerImages.observe(image)
    })

    const observerIframes = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                const iframe = entry.target
                const src = iframe.getAttribute('data-src')
                iframe.setAttribute('src', src)
                iframe.removeAttribute('data-src')
                observer.unobserve(iframe)
            }
        })
    })

    iframes.forEach((iframe) => {
        observerIframes.observe(iframe)
    })
}
