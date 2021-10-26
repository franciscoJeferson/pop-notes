export default {
  remove() {
    const pages = document.querySelectorAll('.page')
    const overlays = document.querySelectorAll('.page')

    if(pages.length) {
      pages.forEach( item => {
        item.animate(
          [{opacity: 1}, {opacity: 0}],
          {fill: "forwards", duration: 400}
        )
        setTimeout(() => {
          item.remove()
        }, 400)
      })
    }
    if(overlays.length) {
      overlays.forEach( item => {
        item.animate(
          [{opacity: 1}, {opacity: 0}],
          {fill: "forwards", duration: 400}
        )
        setTimeout(() => {
          item.remove()
        }, 400)
      })
    }
  }
}