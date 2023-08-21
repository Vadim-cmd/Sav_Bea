export default function initializeAccordion() {
    const faqList = document.querySelector('.faq-list')

    let activeIndex = null

    const updateContentHeight = (contentWrapper, isOpen) => {
        if (isOpen) {
            if (activeIndex !== null) {
                const prev = faqList.querySelector(`.faq-list--title[data-index="${activeIndex}"]`)

                prev.nextElementSibling.style.height = 0
            }

            const contentDom = contentWrapper.querySelector('.faq-list--description-content')
            const contentHeight = contentDom.clientHeight

            contentWrapper.style.height = contentHeight + 'px'
        } else {
            contentWrapper.style.height = 0
        }
    }

    const updateActiveIndex = (newIndex) => {
        const oldIndex = activeIndex

        activeIndex = newIndex

        if (oldIndex !== null) {
            const dom = faqList.querySelector(`.faq-list--title[data-index="${oldIndex}"]`)

            dom.parentElement.classList.remove('opened')
        }
        if (newIndex !== null) {
            const dom = faqList.querySelector(`.faq-list--title[data-index="${newIndex}"]`)

            dom.parentElement.classList.add('opened')
        }
    }

    faqList.addEventListener('click', (e) => {
        const isTitle = Array.from(e.target.classList).includes('faq-list--title')

        if (!isTitle) return

        const targetIndex = Number(e.target.getAttribute('data-index'))

        const contentWrapper = e.target.nextElementSibling

        const isOpen = targetIndex !== activeIndex

        updateContentHeight(contentWrapper, isOpen)

        updateActiveIndex(isOpen ? targetIndex : null)
    })
}
