window.dataLayer = window.dataLayer || []
function gtag() {
    dataLayer.push(arguments)
}
gtag("js", new Date())
gtag("config", "UA-165741526-1")

function getCurrentLang() {
    return (location.href.match(/\/BTEN\/([A-Z]{2})\//) || [])[1]
}
function switchLang(lang) {
    const currentLang = getCurrentLang()
    if (currentLang === lang) return
    if (!currentLang) return goTo("Index", lang)
    location.href = location.href.replace(`/BTEN/${currentLang}/`, `/BTEN/${lang}/`)
}
function goTo(path, lang) {
    lang = lang || getCurrentLang() || "EN"
    location.href = `/BTEN/${lang}/${path}`
}

function dropdownClick() {
    document.getElementById("dropdown").classList.toggle("show")
}
window.onclick = function(event) {
    const dropdowns = document.getElementsByClassName("dropdown-content")
    for (let i = 0; i < dropdowns.length; i++) {
        const openDropdown = dropdowns[i]
        if (openDropdown.classList.contains("show"))
            openDropdown.classList.remove("show")
    }
}

const i18n = {
    EN: {
        index: "Index",
        about: "About us",
        footer: "BTEN is maintained by the [BTEN Team]."
    },
    DE: {
        index: "Index",
        about: "Über uns",
        footer: "BTEN wird vom [BTEN Team] instand gehalten."
    },
    ES: {
        index: "Índice",
        about: "Acerca de",
        footer: "BTEN está mantenido por el [Equipo BTEN]."
    },
    FR: {
        index: "Index",
        about: "À propos de nous",
        footer: ""
    },
    IT: {
        index: "Indice",
        about: "Su di noi",
        footer: ""
    },
    SV: {
        index: "Index",
        about: "Om oss",
        footer: ""
    }
}

document.addEventListener("DOMContentLoaded", () => {
    const currentLang = getCurrentLang()
    const indexButton = document.getElementById("index-btn")
    const aboutButton = document.getElementById("about-btn")
    const footerText = document.getElementById("footer-text")
    if (indexButton)
        indexButton.innerText = (i18n[currentLang] || i18n.EN).index
    if (aboutButton)
        aboutButton.innerText = (i18n[currentLang] || i18n.EN).about
    if (footerText)
        footerText.innerHTML = (i18n[currentLang] || i18n.EN).footer
            .replace(/\[(.+?)\]/, `<a href="#" onclick="goTo('About')">$1</a>`)
    if (currentLang && currentLang !== "EN") {
        const langSelectorIcon = document.querySelector("#lang-selector > .icon")
        const currentLangButton = document.querySelector(`#dd-lang-${currentLang}`)
        if (currentLangButton) {
            currentLangButton.remove()
            langSelectorIcon.classList.remove("flag-EN")
            langSelectorIcon.classList.add(`flag-${currentLang}`)
            const langs = document.querySelector("#lang-selector + .dropdown-content")
            const englishButton = document.createElement("a")
            englishButton.href = "#"
            englishButton.onclick = () => switchLang("EN")
            englishButton.id = "dd-lang-EN"
            englishButton.title = "English"
            const englishIcon = document.createElement("div")
            englishIcon.classList.add("icon", "flag-EN")
            englishButton.append(englishIcon)
            langs.prepend(englishButton)
        }
    }
})