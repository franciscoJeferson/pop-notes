import { navigateTo, innerMarkers, innerNotes } from '../index.js'


const createElement = (elementName, attributes) => {
  const element = document.createElement(elementName)
  const attributesAsArray = Object.entries(attributes)
  attributesAsArray.forEach((arr) => element.setAttribute(arr[0], arr[1]))
  return element
}

const createCardNewMarker = () => {
  const overlay = createElement('div', {
    class: 'overlay'
  })
  const card = createElement('div', {
    class: 'c-card card-new-marker'
  })
  card.innerHTML = `
  <header class="card-new-marker__header">
    <h3>Novo Marcador</h3>
  </header>
  <main class="card-new-marker__main">
    <input class="input" placeholder="Criar novo marcador">
    <div class="controls"></div>
  </main>
  `
  const buttonCancel = createElement('button', {
    class: 'cancel'
  })
  buttonCancel.innerHTML = `<p>Cancelar</p>`
  const buttonAdd = createElement('button', {
    class: 'add',
    disabled: 'true'
  })
  buttonAdd.innerHTML = `<p>Adicionar</p>`
  card.querySelector('.card-new-marker__main .controls').append(buttonCancel)
  card.querySelector('.card-new-marker__main .controls').append(buttonAdd)
  card.animate(
    [{ opacity: 0 }, { opacity: 1 }],
    { fill: 'forwards', duration: 400 }
  )
  overlay.animate(
    [{ opacity: 0 }, { opacity: 1 }],
    { fill: 'forwards', duration: 400 }
  )
  document.body.append(card)
  document.body.append(overlay)
  // ===== EVENT LISTENER
  overlay.addEventListener('click', event => {
    (async () => {
      if (window.location.hash !== '') {
        window.history.back()
      }
    })()
  })
  buttonCancel.addEventListener('click', event => {
    (async () => {
      if (window.location.hash !== '') {
        window.history.back()
      }
    })()
  })
  const input = card.querySelector('.card-new-marker__main input')
  const markers = !JSON.parse(localStorage.getItem('markers')) ? [] :
    JSON.parse(localStorage.getItem('markers'))
  input.addEventListener('input', ({ target }) => {
    if (target.value.length && !markers.includes(target.value.replace(/[' ']/gi, '-'))) {
      buttonAdd.disabled = false
    } else {
      buttonAdd.disabled = true
    }
  })
  buttonAdd.addEventListener('click', event => {
    (async () => {
      if(window.location.hash !== '') {
        window.history.back()
      }
      if(!markers.includes(input.value.replace(/[' ']/gi, '-'))) {
        await markers.push(input.value.replace(/[' ']/gi, '-'))
      }
      localStorage.setItem('markers', JSON.stringify(markers))
      innerMarkers()
    })()
  })

}
const createCardMoreOptions = (note) => {
  const overlay = createElement('div', {
    class: 'overlay'
  })
  const card = createElement('div', {
    class: 'c-card card-more-options'
  })
  const buttonRemoveNote = createElement('li', {
    class: 'remove-note'
  })
  const markers = !JSON.parse(localStorage.getItem('markers')) ? [] : JSON.parse(localStorage.getItem('markers'))

  buttonRemoveNote.innerHTML = `<p>Excluir nota</p>`
  card.innerHTML = `
  <header class="card-more-options__header">
    <h3>Mais opcoes</h3>
  </header>
  <main class="card-more-options__main">
    <ul></ul>
    <input type="checkbox" id="toggle-drop-view-markers" hidden>
    <div class="drop-view-markers">
      <label for="toggle-drop-view-markers" class="drop-view-markers__header">
        <p>Trocar marcador</p>
        <svg viewBox="0 0 200 200">
          <path style="fill:none;stroke-width:3;stroke-linecap:round;stroke:#FFFFFF;" d="M 19.75 27 L 8.75 16 L 19.75 5 " transform="matrix(6.25,0,0,6.25,0,0)"/>
        </svg>
      </label>
      <main class="drop-view-markers__main">
        <ul></ul>
      </main>
    </div>
  </main>
  `
  markers.forEach((item) => {
    const li = createElement('li', {})
    li.innerHTML = `<p>${item}</p>`
    li.setAttribute('data-marker', item)
    card.querySelector('.card-more-options__main .drop-view-markers ul').append(li)
    li.addEventListener('click', event => {
      (async () => {
        if(window.location.hash !== '') {
          window.history.back()
        }
        const notes = !JSON.parse(localStorage.getItem('notes')) ? [] :
          JSON.parse(localStorage.getItem('notes'))
        const currentNotes = notes.filter(item => item.id !== note.id)
        const newNote = {
          id: note.id,
          marker: event.target.dataset.marker,
          title: note.title,
          content: note.content
        }
        currentNotes.push(newNote)
        localStorage.setItem('notes', JSON.stringify(currentNotes))
        innerNotes()
        setTimeout(() => {
          window.location.hash = event.target.dataset.marker
        }, 10)
      })()
    })
  })
  card.querySelector('.card-more-options__main ul').append(buttonRemoveNote)

  document.body.append(card)
  document.body.append(overlay)
  card.animate(
    [{ opacity: 0 }, { opacity: 1 }],
    { fill: 'forwards', duration: 400 }
  )
  overlay.animate(
    [{ opacity: 0 }, { opacity: 1 }],
    { fill: 'forwards', duration: 400 }
  )
  // HANDLE EVENTS LISTNERS 
  overlay.addEventListener('click', event => {
    (async () => {
      if (window.location.hash !== '') {
        window.history.back()
      }
    })()
  })

  buttonRemoveNote.addEventListener('click', event => {
    (async () => {
      if (window.location.hash !== '') {
        window.history.back()
      }
      const notes = !JSON.parse(localStorage.getItem('notes')) ? [] :
        JSON.parse(localStorage.getItem('notes'))
      const currentNotes = notes.filter(item => item.id !== note.id)
      localStorage.setItem('notes', JSON.stringify(currentNotes))
      innerNotes()
    })()
  })
}
const removeMarker = (marker) => {
  const markers = JSON.parse(localStorage.getItem('markers'))
  const overlay = createElement('div', {
    class: 'overlay'
  })
  const card = createElement('div', {
    class: 'c-card card-delete-marker'
  })

  card.innerHTML = `
  <header>
  <h3>Deletar marcador<h3>
  </header>
  <main>
  <p>Deseja deletar o marcador <strong>${marker}</strong>?</p>
  <div class="controls"></div>
  </main>
  `
  const buttonCancel = createElement('button', {
    class: 'cancel'
  })
  buttonCancel.innerHTML = `<p>Cancelar<p>`
  const buttonDelete = createElement('button', {
    class: 'delete'
  })
  buttonDelete.innerHTML = `<p>Deletar<p>`
  card.querySelector('.controls').append(buttonCancel)
  card.querySelector('.controls').append(buttonDelete)
  card.animate(
    [{ opacity: 0 }, { opacity: 1 }],
    { fill: 'forwards', duration: 400 }
  )
  overlay.animate(
    [{ opacity: 0 }, { opacity: 1 }],
    { fill: 'forwards', duration: 400 }
  )
  document.body.append(card)
  document.body.append(overlay)
  if (markers.length === 1) {
    buttonDelete.disabled = true
  } else {
    buttonDelete.disabled = false
  }
  // HANDLE EVENT LISTENER
  overlay.addEventListener('click', event => {
    (async () => {
      if (window.location.hash !== '') {
        window.history.back()
      }
    })()
  })
  buttonCancel.addEventListener('click', event => {
    (async () => {
      if(window.location.hash !== '') {
        window.history.back()
      }
    })()
  })
  buttonDelete.addEventListener('click', event => {
    (async () => {
      if(window.location.hash !== '') {
        window.history.back()
      }
      localStorage.setItem('markers',
        JSON.stringify(markers.filter(item => item !== marker)))
      innerMarkers()
    })()
  })
}

const removeCards = () => {
  const cards = document.querySelectorAll('.c-card')
  const overlays = document.querySelectorAll('.overlay')
  cards.forEach(item => {
    if (item) {
      item.animate(
        [{ opacity: 1 }, { opacity: 0 }],
        { fill: 'forwards', duration: 400 }
      )
      setTimeout(() => {
        item.remove()
      }, 400)
    }
  })
  overlays.forEach(item => {
    if (item) {
      item.animate(
        [{ opacity: 1 }, { opacity: 0 }],
        { fill: 'forwards', duration: 400 }
      )
      setTimeout(() => {
        item.remove()
      }, 400)
    }
  })
}



export {
  createCardNewMarker,
  removeCards,
  removeMarker,
  createCardMoreOptions
}