/**
 *
 * @param {Object} options
 * @param {String} options.title
 * @param {String} options.content
 * @param {String} options.poster
 * @returns {String}
 */
const headers = (options) => {
    return `<div class="course-header flex-container column row-lmd align-center align-start-lmd sapce-between-lmd mb-15 mb-lmd-20">
        <div class="course-header--close">&times;</div>
        <div class="course-header--content mb-10 mb-lmd-0">
            <h2 class="title mb-lmd-9">${options.title}</h2>

            <div>${options.content}</div>
        </div>

        <div class="course-header--poster ml-lmd-9">
            <img src="${options.poster}" alt="${options.title}"/>
        </div>
    </div>`
}

/**
 *
 * @param {Object} options
 * @param {Objcet[]} options.programs
 * @param {String} options.programs.text
 * @param {Boolean} options.programs.border
 * @param {String} options.programs.type
 * @param {String[]} options.programs.descritions
 * @returns {String}
 */
const programs = (options) => {
    let programItemsList = ''
    let listClasses = null

    options.programs.forEach((program, index) => {
        let programItemClass = null
        let positionOffsetClass = null
        let contentOffsetClass = null

        if (program.type === 'primary') {
            programItemClass = 'flex-container align-center mb-2 mb-md-7'
            positionOffsetClass = 'mr-2 mr-md-3'
            contentOffsetClass = 'text-center text-left-md py-4 px-8 py-lmd-5 pr-lmd-6 pl-lmd-15'
        } else {
            programItemClass = 'flex-container column align-center mb-8 col-12 col-lmd-4 mx-7'
            contentOffsetClass = 'space-center py-4 px-4 mt-2'
            listClasses = 'flex-container column row-lmd align-center align-start-lmd mb-20'
        }

        programItemsList += `
            <li class="program-item ${programItemClass || ''}">
                <span class="position flex-container align-center space-center ${
                    positionOffsetClass || ''
                }">
                    ${index + 1}
                </span>

                <p 
                    class="content flex-container align-center ${contentOffsetClass || ''} ${
            program.border ? 'border' : ''
        }" style="max-width: 440px">
                    ${program.text}
                </p>

                ${program.inner || ''}

            </li>
        `
    })

    return `<ul class=\"${listClasses || ''}\">${programItemsList}</ul>`
}

/**
 *
 * @param {Object} options
 * @param {String} options.title
 * @param {String} options.link
 * @param {String} options.listType
 * @param {Object[]} options.items
 * @param {String} options.items.price
 * @param {String} options.items.type
 * @param {Object[]} options.items.list
 * @param {String} options.items.list.text
 * @param {String} options.items.list.type
 * @returns {String}
 */
const prices = (options) => {
    let items = ''

    options.items.forEach((item) => {
        let list = ''

        if (item.list) {
            item.list.forEach((li, index) => {
                list += `<li class="content-item ${li.type} ${
                    item.list.length - 1 !== index ? 'mb-6' : ''
                }"> 
                    ${li.text}
                </li>`
            })
        }

        items += `
            <div class="price-item col-12 col-lmd-6 mb-15 mb-lmd-0 mx-auto mx-lmd-0">

                <div class="price-item--content ${
                    options.listType
                } flex-container column align-center px-4 py-11 px-md-10 py-md-13 radius-25">
                    <span class="content-price mb-6">${item.price}€ </span>

                    <span class="content-type">${item.type}</span>

                    ${list ? `<ul class="mt-13">${list}</ul>` : ''}
                    
                </div>

                <a href="${
                    options.link || item.link
                }" target="_black" class="button primary d-block mx-auto mt-8" style="max-width: 300px; height: 60px">
                    Купити!
                </a>
            </div>
        `
    })

    return `
        <div class="course-prices">
            <div class="prices-title mb-10 mb-lmd-15 text-center">${options.title}</div>
            
            <div class="flex-container column row-lmd space-between-lmd">
                ${items}
            </div>
        </div>
    `
}

export default (options, trigger) => {
    // let programsListAttrs = ''

    // if (trigger === 'melismatic-vibes') {
    //     programsListAttrs = 'class'
    // }

    return `<div class="container">
        ${headers(options.headers)}

        <div>
            ${options.body.content || ''}

            ${
                options.body.programs
                    ? `<h3 class="modals-subtitle mb-8 mb-md-10-10 mb-lmd-15 text-center">${
                          options.body.programTitle
                      }</h3>

                <div class="${trigger}--programs">
                    <div class="${trigger}--programs-wrapper">${programs(options.body)}</div>

                    ${
                        options.body.practicesMaterials
                            ? `<div class="${trigger}--programs-medias">
                                <p> ${options.body.practicesMaterials.text} </p>

                                <div class="medias">

                                    <svg width="63" height="76">
                                        <use
                                            xlink:href="./icons/icons-sprite.svg#icon-volume"
                                        />
                                    </svg>

                                    <svg width="76" height="76">
                                        <use
                                            xlink:href="./icons/icons-sprite.svg#icon-play"
                                        />
                                    </svg>

                                    <svg width="82" height="76">
                                        <use
                                            xlink:href="./icons/icons-sprite.svg#icon-pdf"
                                        />
                                    </svg>
                                </div>
                            </div>`
                            : ''
                    }
                </div>`
                    : ''
            }
            ${prices(options.prices)}
        </div>
    </div>`
}
