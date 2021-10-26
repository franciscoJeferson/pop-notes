export default {
  page () {
    const createElement = (elementName, attributes) => {
      const element = document.createElement(elementName)
      const attributesAsArray = Object.entries(attributes)
      attributesAsArray.forEach((arr) => element.setAttribute(arr[0], arr[1]))
      return element
    }
    const page = createElement('section', {
      class: 'page page-about'
    })
    page.innerHTML = `
      <header class="page-about__header">
        <button class="back-button">
          <svg viewBox="0 0 512 512">
            <path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="48" d="M328 112L184 256l144 144"/>
          </svg>
        </button>
        <h3>Notas</h3>
      </header>
      <main class="page-about__main">
        <h1>Notas</h1>
        <h2>Feito por Francisco Jeferson</h2>
        <h2>Versao: 1.09 beta</h2>
        <h3>2021 - Brasil</h3>
      </main>
    `
    page.animate(
      [{opacity: 0},{opacity: 1}],
      {fill: 'forwards', duration: 400}
    )
    document.body.append(page)
    /* ===== HANDLE EVENTS ===== */
    const backButton = page.querySelector('header .back-button')
    backButton.addEventListener('click', event => {
      (async () => {
        if(window.location.hash !== '') {
          window.history.back()
        }
      })()
    })
  }
}