export const cleanHTML = (element: Element): Element => {
  const newElement = element.cloneNode(true) as Element

  const tagsToRemove = [
    'script',
    'style',
    'svg',
    'img',
    'iframe',
    'noscript',
    'link',
    'next-route-announcer'
  ]

  tagsToRemove.forEach(tag => {
    const elements = newElement.querySelectorAll(tag)

    elements.forEach(element => {
      element.remove()
    })
  })

  newElement.querySelectorAll('div').forEach(div => {
    if (div.textContent === '') {
      div.remove()
    }
  })

  return newElement
}
