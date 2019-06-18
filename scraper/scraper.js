const cheerio = require('cheerio')
const fs = require('fs')

let menu = {}

// scrapes menu from local html file at 'path' and prepares object with key as the html tab ID
function scrape(tabId, path) {

    let tab = []
    const $ = cheerio.load(fs.readFileSync(path))
    $('.pm-menu-section').each((i, elem) => {
        let section = {
            "section title": $(elem).find('h3').text(),
            "section items": [],
        }
        const sectionDetails = $(elem).find('section-description').text()
        if (sectionDetails) { section["section details"] = sectionDetails }
        $(elem).find('.pm-dish-card').each((j, elemen) => {
            let item = {
                "price": $(elemen).find('.price').text(),
                "name": $(elemen).find('.dish-title').text().replace('\n', ''),
                "description": $(elemen).find('.description').text().replace('\n', ''),
            }
            const itemImage = $(elemen).find('.dish-photos').find('img').attr('src')
            if (itemImage) { item["image"] = itemImage }
            const itemExtras = $(elemen).find('.dish-extras').text()
            if (itemExtras) { item["extras"] = itemExtras }
            section['section items'].push(item)
        })
        tab.push(section)
    })
    menu[tabId] = tab
}

scrape('menumain', './main.html')
scrape("menumain", './main.html')
scrape("menuveg", './veg.html')
scrape("menulunch", './lunch.html')
scrape("menuparty", './party.html')
scrape("menugf", './gf.html')
scrape("menudrinks", './drinks.html')

// menu file may be used in frontend and node applicatons
const data = `
const menu = ${JSON.stringify(menu, null, 2)}


if (typeof module !== 'undefined') {
    module.exports = menu
}
`

fs.writeFile('./menu.js', data, (e) => e && console.error(e))
