function openTab(evt, tabId) {
    // Get all elements with class="tabcontent" and hide them
    let tabcontent = document.getElementsByClassName('tabcontent')
    for (let i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = 'none'
    }
    // Get all elements with class="tablinks" and remove the class "active"
    let tablinks = document.getElementsByClassName('tablinks')
    for (let i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(' active', '')
    }
    // Show the current tab, and add an "active" class to the button that opened the tab 
    document.getElementById(tabId).style.display = 'block'
    evt.currentTarget.className += ' active'
    document.getElementById('menutabs').style.scrollBehavior = 'smooth'
    // center active tab
    const ElemPosition = evt.currentTarget.offsetLeft - 20
    const targetPosition = (evt.currentTarget.parentElement.clientWidth - evt.currentTarget.clientWidth) / 2
    evt.currentTarget.parentElement.scrollLeft = ElemPosition - targetPosition
    // scroll to top of menu section
    const menuTop = document.getElementById('ourmenu').offsetTop
    if (document.documentElement.scrollTop > menuTop || document.body.scrollTop > menuTop) {
        document.documentElement.scrollTop = menuTop
        // safari 
        document.body.scrollTop = menuTop
    }
    document.getElementById('menutabs').style.scrollBehavior = 'auto'
    setTimeout(updateArrows, 500)
}

function menuScrolled() {
    document.addEventListener('mouseup', updateArrows)
    document.addEventListener('touchend', updateArrows)
}

function updateArrows() {
    document.removeEventListener('mouseup', updateArrows)
    document.removeEventListener('touchend', updateArrows)
    const el = document.getElementById('menutabs')
    const maxScrollLeft = el.scrollWidth - el.clientWidth
    // Hide arrows when not scrollable
    if (el.scrollLeft < maxScrollLeft - 8) {
        document.getElementById('indicator-right').style.display = 'block'
    }
    else {
        document.getElementById('indicator-right').style.display = 'none'
    }
    if (el.scrollLeft > 8) {
        document.getElementById('indicator-left').style.display = 'block'
    }
    else {
        document.getElementById('indicator-left').style.display = 'none'
    }
}

function arrowLeft() {
    const el = document.getElementById('menutabs')
    el.style.scrollBehavior = 'smooth'
    // scroll far enough without passing any content
    if (el.scrollWidth > el.clientWidth * 2) {
        el.scrollLeft -= el.clientWidth * 0.7
    }
    else {
        el.scrollLeft = 0
    }
    // smooth scroll behavior prevents dragscroll from working correctly
    el.style.scrollBehavior = 'auto'
    // smooth scroll behavior delays leftScroll update
    setTimeout(updateArrows, 500)
}

function arrowRight() {
    const el = document.getElementById('menutabs')
    el.style.scrollBehavior = 'smooth'
    // scroll far enough without passing any content
    if (el.scrollWidth > el.clientWidth * 2) {
        el.scrollLeft += el.clientWidth * 0.7
    }
    else {
        el.scrollLeft += el.scrollWidth
    }
    // smooth scroll behavior prevents dragscroll from working correctly
    el.style.scrollBehavior = 'auto'
    // smooth scroll behavior delays leftScroll update
    setTimeout(updateArrows, 500)
}

fetch('./assets/js/menu.json')
    .then(r => r.json())
    .then(menu => {
        // Add menu content
        menu.forEach(tab => {
            tab.sections.forEach((section, sectionIndex) => {
                let sectionDiv = document.createElement('div')
                sectionDiv.className = 'menusection'
                sectionDiv.innerHTML = `
        <h3 class="sectiontitle">${section["section title"]}</h3>
        ${section["section details"] ? `<p class="sectiondetails">${section["section details"]}</p>` : ''}
        `
                if (section["section items"]) {
                    let sectionBody = document.createElement('div')
                    sectionBody.className = 'sectionbody'

                    section["section items"].forEach((item, itemIndex) => {
                        let sectionItem = document.createElement('div')
                        sectionItem.className = 'sectionitem'
                        let price = item.price ? item.price.toString().split('.')[1] ? item.price.toFixed(2) : item.price : ''
                        sectionItem.innerHTML = `
${item.price ? `<p class="itemprice">${`${price}`}</p>` : ''}
${item.name ? `<h5 class="itemname">${item.name}</h5>` : ''}
${item.description ? `<p class="itemdesc">${item.description}</p>` : ''}
${item["gf option"] ? `<p class="itemdietary">*Gluten-free optional</p>` : ''}
${item.vegan ? `<p class="itemdietary">*Vegan</p>` : ''}
${item.vegetarian ? `<p class="itemdietary">*Vegetarian</p>` : ''}
${item.extras ? `<p class="itemextras">${item.extras}</p>` : ''}
${item.options ? `<p class="itemoptions">${item.options}</p>` : ''}
<div class="itemimgwrapper">
    ${item.image ? `
    <div class="itemimage" style="background-image:url(./assets/images/${item.image})">
        <iframe src="https://www.facebook.com/plugins/share_button.php?href=https%3A%2F%2Fwww.munchbistro.com%2Fmenu%2F${item.image.split('.')[0]}.html&layout=button&size=small&width=59&height=20&appId" width="59" height="20" style="border:none;overflow:hidden" scrolling="no" frameborder="0" allowTransparency="true" allow="encrypted-media"></iframe>
    </div>` : ''}
    ${item.featured ? `<p class="itemfeatured">FEATURED</p>` : ''}
</div>
`
                        sectionBody.appendChild(sectionItem)
                    })
                    sectionDiv.appendChild(sectionBody)
                }

                if (section["section list"]) {
                    let sectionList = document.createElement('div')
                    sectionList.className = 'sectionlist'
                    sectionList.innerHTML = section["section list"]
                    sectionDiv.appendChild(sectionList)
                }
                document.getElementById(tab.id).appendChild(sectionDiv)
            })
            if (tab.disclaimer) {
                let disclaimer = document.createElement('div')
                disclaimer.className = 'menusection'
                disclaimer.innerHTML = `<div class="menudisclaimer">${tab.disclaimer}</div>`
                document.getElementById(tab.id).appendChild(disclaimer)
            }
        })
    })
    .catch(e => console.log(e))



// update arrow indicators after tab interaction is complete
document.getElementById('menutabs').addEventListener('touchstart', menuScrolled)
document.getElementById('menutabs').addEventListener('mousedown', menuScrolled)

// initialize page
document.getElementById('defaultOpen').click()
updateArrows()
