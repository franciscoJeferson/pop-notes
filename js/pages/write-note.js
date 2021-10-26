import { innerNotes, currentMarker } from '../index.js'

export default {
  page(edit, currentNote) {
    const createElement = (elementName, attributes) => {
      const element = document.createElement(elementName)
      const attributesAsArray = Object.entries(attributes)
      attributesAsArray.forEach((arr) => element.setAttribute(arr[0], arr[1]))
      return element
    }
    const page = createElement('section', {
      class: 'page page-write-note'
    })
    const overlay = createElement('section', {
      class: 'overlay'
    })
    if(!edit) {
      page.innerHTML = `
        <header class="page-write-note__header"></header>
        <main class="page-write-note__main">
          <input type="text" placeholder="Titulo...">
          <textarea placeholder="Nota..."></textarea>
        </main>
      `
    } else {
      page.innerHTML = `
        <header class="page-write-note__header"></header>
        <main class="page-write-note__main">
          <input type="text" value="${currentNote.title}" placeholder="Titulo...">
          <textarea placeholder="Nota...">${currentNote.content}</textarea>
        </main>
      `
    }
    
    const buttonSaveAndBack = createElement('button', {
      class: 'button-save-and-back'
    })
    buttonSaveAndBack.innerHTML =`
    <svg viewBox="0 0 200 200">
    <path style="fill:none;stroke-width:3;stroke-linecap:round;stroke:rgb(0%,0%,0%);" d="M 19.75 27 L 8.75 16 L 19.75 5 " transform="matrix(6.25,0,0,6.25,0,0)"/>
    </svg>
    `
    page.querySelector('.page-write-note__header').append(buttonSaveAndBack)

    // ANIMATIONS
    page.animate(
      [{ opacity: 0}, { opacity: 1}],
      {fill: 'forwards', duration: 400}
    )
    overlay.animate(
      [{ opacity: 0}, { opacity: 1}],
      {fill: 'forwards', duration: 400}
    )
    
    document.body.append(page)
    document.body.append(overlay)

    // EVENT LISTENERS
    const titleNote = page.querySelector('.page-write-note__main input')
    const contentNote = page.querySelector('.page-write-note__main textarea')
    let click = 1
    overlay.addEventListener('click', event => {
      (async () => {
        if(window.location.hash !== '') {
          window.history.back()
        }
        const notes = !JSON.parse(localStorage.getItem('notes') )? [] : 
        JSON.parse(localStorage.getItem('notes'))
        if(!edit) {
          const title = titleNote.value
          const content = contentNote.value 
          const generateId = () => {
            const year = new Date().getFullYear()
            const month = new Date().getMonth()
            const day = new Date().getDate()
            const hours = new Date().getHours()
            const minutes = new Date().getMinutes()
            const seconds = new Date().getSeconds()
            const miliSeconds = new Date().getMilliseconds()
            return `${year}/${month}/${day}/${hours}/${minutes}/${seconds}/${miliSeconds}`
          }
          if(title.length && content.length) {
            const note = {
              id: generateId(),
              marker: currentMarker,
              title: title,
              content: content
            }
            if(click <= 1) {
              await notes.push(note)
              click++
            }
            localStorage.setItem('notes', JSON.stringify(notes))
            innerNotes()
          }
        } else {
          if( titleNote.value !== currentNote.title || contentNote.value !== currentNote.content ) {
            const note = {
              id: currentNote.id,
              marker: currentNote.marker,
              title: titleNote.value,
              content: contentNote.value,
            }
            const updatedNotes = notes.filter(item => item.id !== currentNote.id)
            if(note.title !== '' && note.content !== '') {
              await updatedNotes.push(note)
            }
            localStorage.setItem('notes', JSON.stringify(updatedNotes))
            innerNotes()
          }
        }
      })()
    })
    buttonSaveAndBack.addEventListener('click', event => {
      (async () => {
        if(window.location.hash !== '') {
          window.history.back()
        }
        const notes = !JSON.parse(localStorage.getItem('notes') )? [] : 
        JSON.parse(localStorage.getItem('notes'))
        if(!edit) {
          const title = titleNote.value
          const content = contentNote.value 
          const generateId = () => {
            const year = new Date().getFullYear()
            const month = new Date().getMonth()
            const day = new Date().getDate()
            const hours = new Date().getHours()
            const minutes = new Date().getMinutes()
            const seconds = new Date().getSeconds()
            const miliSeconds = new Date().getMilliseconds()
            return `${year}/${month}/${day}/${hours}/${minutes}/${seconds}/${miliSeconds}`
          }
          if(title.length && content.length) {
            const note = {
              id: generateId(),
              marker: currentMarker,
              title: title,
              content: content
            }
            if(click <= 1) {
              await notes.push(note)
              click++
            }
            localStorage.setItem('notes', JSON.stringify(notes))
            innerNotes()
          }
        } else {
          if( titleNote.value !== currentNote.title || contentNote.value !== currentNote.content ) {
            const note = {
              id: currentNote.id,
              marker: currentNote.marker,
              title: titleNote.value,
              content: contentNote.value,
            }
            const updatedNotes = notes.filter(item => item.id !== currentNote.id)
            if(note.title !== '' && note.content !== '') {
              await updatedNotes.push(note)
            }
            localStorage.setItem('notes', JSON.stringify(updatedNotes))
            innerNotes()
          }
  
        }
      })()
    })
  }
}