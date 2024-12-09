import { Window } from "happy-dom"

export const getDocument = (html: string) => {
  const window = new Window()
  const document = window.document

  document.body.innerHTML = html

  return document
}
