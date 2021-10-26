export default {
  page () {
    const createElement = (elementName, attributes) => {
      const element = document.createElement(elementName)
      const attributesAsArray = Object.entries(attributes)
      attributesAsArray.forEach((arr) => element.setAttribute(arr[0], arr[1]))
      return element
    }
    const page = createElement('section', {
      class: 'page page-help'
    })
    page.innerHTML = `
      <header class="page-help__header">
        <button class="back-button">
          <svg viewBox="0 0 512 512">
            <path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="48" d="M328 112L184 256l144 144"/>
          </svg>
        </button>
        <h3>Ajuda</h3>
      </header>
      <main class="page-help__main">
        <h3>Como criar notas? </h3>
        <p>Para criar notas clique no botao laraja no cato inferior esquerdo.</p>
        <h3>Como editar notas? </h3>
        <p>Para editar notas clique na desajada e faca as alteracoes desejadas.</p>
        <h3>Como excluir notas? </h3>
        <p>Para excluir notas existem dois meios, o primeiro e pressionado a nota desajada, ou click uma vez na nota e apague todo o conteudo.</p>
        <h3>Como trocar de marcador? </h3>
        <p>Pressione a nota desejada e troque de marcador.</p>
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