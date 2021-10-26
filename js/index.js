import { createCardNewMarker, removeCards, removeMarker, createCardMoreOptions }
  from './utilities/cards.js'
import pageWriteNote from './pages/write-note.js'
import pageAbout from './pages/about.js'
import pageHelp from './pages/help.js'
import removePage from './pages/remove-pages.js'

let currentMarker

/* ===== SEARCH NOTES ===== */
const inputSearchNotes = document.querySelector('#search')
inputSearchNotes.addEventListener('input', event => {
  const id = []
  const notes = document.querySelectorAll('.main .container-02 .container__main .note')
  const shadowNoteFind = `
    0.2rem 0.2rem 0.2rem hsl(36, 100%, 57%),
    -0.2rem -0.2rem 0.2rem hsl(36, 100%, 57%),
    -0.2rem 0.2rem 0.2rem hsl(36, 100%, 57%),
    0.2rem -0.2rem 0.2rem hsl(36, 100%, 57%)
  `
  const shadowNoteNoFind = `
    0.2rem 0.2rem 0.2rem rgba(0, 0, 0, 0.06),
    -0.2rem -0.2rem 0.2rem rgba(0, 0, 0, 0.06),
    -0.2rem 0.2rem 0.2rem rgba(0, 0, 0, 0.06),
    0.2rem -0.2rem 0.2rem rgba(0, 0, 0, 0.06)
  `
  notes.forEach(item => {
    id.push(item.id)
  })
  const noteSearched = id.filter(item => !item.search(event.target.value))
  if (noteSearched && event.target.value.length) {
    const currentNote = noteSearched[0]
    notes.forEach(item => {
      item.style.boxShadow = shadowNoteNoFind
      if (item.id === currentNote) {
        item.style.boxShadow = shadowNoteFind
        if(window.location.hash !== '') {
          window.history.back()
        }
        setTimeout(() => {
          window.location.hash = currentNote
          inputSearchNotes.focus()
        }, 10) 
      }
    })
  } else {
    notes.forEach(item => {
      item.style.boxShadow = shadowNoteNoFind
    })
    if(window.location.hash !== '') {
      window.history.back()
    }
  }
})

/* ===== HANDLE EVENTS INTO SIDE NAV ===== */
const sideNav = document.querySelector('.main .container .side-nav')
// ===== ADD NEW MARKER 
sideNav.addEventListener('click', event => {
  event.stopPropagation()
  if (event.target.classList.contains('add-new-marker')) {
    if(window.location.hash !== '') {
      window.history.back()
    }
    setTimeout(() => {
      window.location.hash = 'new-marker'
      createCardNewMarker()
    }, 10)
  } else if(event.target.classList.contains('about')) {
    if(window.location.hash !== '') {
      window.history.back()
    }
    setTimeout(() => {
      window.location.hash = 'about'
      pageAbout.page()
    }, 10)
  } else if(event.target.classList.contains('help')) {
    if(window.location.hash !== '') {
      window.history.back()
    }
    setTimeout(() => {
      window.location.hash = 'help'
      pageHelp.page()
    }, 10)
  }
})

// ADD MARKERS INTO DOM
const innerMarkers = () => {
  const markers = !JSON.parse(localStorage.getItem('markers')) ? [] :
    JSON.parse(localStorage.getItem('markers'))
  const ul = document.querySelector('.main .container .side-nav__main__item ul')
  ul.innerHTML = ''
  if (markers.length) {
    markers.forEach((item) => {
      const markerEl = `
        <li data-marker="${item}">
          <svg viewBox="0 0 512 512">
            <path d="M352 48H160a48 48 0 00-48 48v368l144-128 144 128V96a48 48 0 00-48-48z" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32"/>
          </svg>
          <p>${item}</p>
          <button class="remove">
            <svg viewBox="0 0 200 200">
              <path style="fill:none;stroke-width:3;stroke-linecap:round;"
                d="M 9 25 L 41 25 " transform="matrix(4,0,0,4,0,0)" />
            </svg>
          </button>
        </li>
      `
      ul.innerHTML += markerEl
    })
  } else {
    markers.push('Notes')
    localStorage.setItem('markers', JSON.stringify(markers))
    const markerEl = `
      <li data-marker="Notes">
        <svg viewBox="0 0 512 512">
          <path d="M352 48H160a48 48 0 00-48 48v368l144-128 144 128V96a48 48 0 00-48-48z" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32"/>
        </svg>
        <p>Notas</p>
        <button class="remove">
          <svg viewBox="0 0 200 200">
            <path style="fill:none;stroke-width:3;stroke-linecap:round;"
              d="M 9 25 L 41 25 " transform="matrix(4,0,0,4,0,0)" />
          </svg>
        </button>
      </li>
    `
    ul.innerHTML += markerEl
  }
  const li = ul.querySelectorAll('li')
  li.forEach((item) => {
    item.addEventListener('click', event=> {
      event.preventDefault()
      if(window.location.hash !== '') {
        window.history.back()
      }
      if (event.target.classList.contains('remove')) {
        const markerClicked = item.dataset.marker
        setTimeout(() => {
          window.location.hash = 'delete-marker'
          removeMarker(markerClicked)
        }, 10) 
      } else {
        setTimeout(() => {
          window.location.hash = `${event.target.dataset.marker}`
          currentMarker = event.target.dataset.marker
          document.querySelector('#toggle-side-nav').checked = false
        }, 10)
      }
    })
  })
  currentMarker = JSON.parse(localStorage.getItem('markers'))[0]
}

const innerNotes = () => {
  const allNotes = !JSON.parse(localStorage.getItem('notes')) ? [] :
    JSON.parse(localStorage.getItem('notes'))
  const containerNotes = document.querySelector('.main .container__main')
  containerNotes.innerHTML = `
    <button class="add-note">
      <svg viewBox="0 0 512 512">
        <path fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="32" d="M256 112v288M400 256H112"/>
      </svg>
    </button>
  `
  if (allNotes.length) {
    const currentNotes = allNotes.filter(item => item.marker === currentMarker)
    currentNotes.forEach(item => {
      const noteEl = `
        <div class="note" id="${item.title}" data-id="${item.id}">
          <header class="note__header">
            <h4>${item.title}</h4>
          </header>
          <main class="note__main">
            <p>${item.content}</p>
          </main>
        </div>
      `
      containerNotes.innerHTML += noteEl
    })
  }
  /* ===== EVENT IN BUTTON ADD NOTE */
  const buttonAddNote = document.querySelector('.main .container-02 .container__main .add-note')
  buttonAddNote.addEventListener('click', event => {
    if(window.location.hash !== '') {
      window.history.back()
    }
    setTimeout(() => {
      window.location.hash = 'new-note'
      pageWriteNote.page()
    }, 10)
  })
  const noteEl = document.querySelectorAll('.main .container-02 .container__main .note')
  let timeoutPress


  noteEl.forEach((item) => {
    item.addEventListener('click', event => {
      const note = allNotes.filter(note => note.id === item.dataset.id)
      if(window.location.hash !== '') {
        window.history.back()
      }
      setTimeout(() => {
        window.location.hash = 'write-note'
        pageWriteNote.page(true, note[0])
      }, 10)
    })
    item.addEventListener('touchstart', event => {
      timeoutPress = setTimeout(() => {
        const note = allNotes.filter(note => note.id === item.dataset.id)
        if(window.location.hash !== '') {
          window.history.back()
        }
        setTimeout(() => {
          window.location.hash = 'more-options'
          createCardMoreOptions(note[0])
        }, 10)
      }, 600)
    })
    item.addEventListener('touchmove', event => {
      clearTimeout(timeoutPress)
    })
    item.addEventListener('touchend', event => {
      clearTimeout(timeoutPress)
    })
  })
}

innerMarkers()
innerNotes()



/* ===== NAVIGATION =====  */
const navigateTo = (hash) => {
  window.location.hash = hash

}


const handleHash = () => {
  const hash = window.location.hash
  const markers = JSON.parse(localStorage.getItem('markers'))
  if (markers.includes(hash.replace('#', ''))) {
    currentMarker = hash.replace('#', '')
    innerNotes()
  }
  if (hash === '') {
    removeCards()
    removePage.remove()
  }
}

document.body.onhashchange = () => {
  handleHash()
}

handleHash()

window.location.hash = ''

export { navigateTo, innerMarkers, innerNotes, currentMarker }