// PATRÓN MVC

// APP.JS - CONTROLADOR
// ES UN ARCHIVO QUE COMBINA TANTO LA PARTE LÓGICA COMO LA PARTE DE LAS VISTAS, APLICANDO SELECCIÓN Y EVENTOS

// SECCIÓN LÓGICA SE GUARDA EN LOS MODELOS
import {
  addNote, // AGREGAR UNA NOTA EN UN ARREGLO
  deleteNote, // BORRAR UNA NOTA ESPECÍFICA
  updateNote, // ACTUALIZAR NOTA
  saveNotesToLocalStorage, // GUARDAR TODAS LAS NOTAS EN LOCAL STORAGE
  loadNotesFromLocalStorage, // LEER TODAS LAS NOTAS DE LOCAL STORAGE
} from "./models/model.js"

// SECCIÓN PARA ACTUALIZAR EL DOM. MANIPULACIÓN.
import {
  updateNotes, // ACTUALIZAR NOTAS DENTRO DE LA PÁGINA
  getNoteInputValue, // OBTENER LA NOTA DEL INPUT QUE ESCRIBIÓ EL USUARIO
  clearNoteInput, // BORRAR EL INPUT CUANDO EL USUARIO TERMINA DE ESCRIBIR
} from "./views/view.js"

// PSEUDOCÓDIGO
// 1. LEER LAS NOTAS HASTA EL PUNTO MÁS ACTUAL

let notes = loadNotesFromLocalStorage()
console.log("notes", notes)

// 2. SELECCIÓN DE ETIQUETAS DEL DOM

const noteInputElement = document.querySelector("#note-input")
const addNoteButtonElement = document.querySelector("#add-note-button")
const notesElement = document.querySelector("#notes")

// 3. ACTUALIZAR LOS NOTAS
// INPUT updateNotes(notesElement: HTMLNodeElement, notes: [texto, texto, texto])
updateNotes(notesElement, notes)

// 4. EVENTOS
// A. AGREGAR NOTA

addNoteButtonElement.addEventListener("click", (event) => {
  event.preventDefault() // EVITAR EL REFRESH AL DARLE CLICK AL BOTÓN

  // OBTENER LA NOTA DEL INPUT
  const note = getNoteInputValue(noteInputElement)

  // AGREGUÉ LA NUEVA NOTA A LAS NOTAS
  notes = addNote(notes, note)

  // SALVAR LAS NOTAS EN LOCAL STORAGE
  saveNotesToLocalStorage(notes)

  // ACTUALIZAR LAS NOTAS
  updateNotes(notesElement, notes)

  // LIMPIAR EL INPUT
  clearNoteInput(noteInputElement)
})

// B. MANIPULAR NOTA
// - ACTUALIZAR LA NOTA, SU TEXTO
// - BORRAR LA NOTA
notesElement.addEventListener("click", (event) => {
  if (event.target.hasAttribute("data-index")) {
    const index = Number(event.target.getAttribute("data-index"))

    if (event.target.classList.contains("delete-note")) {
      notes = deleteNote(notes, index)
      saveNotesToLocalStorage(notes)
      updateNotes(notesElement, notes)
    }

    if (event.target.classList.contains("update-note")) {
      const updateFieldElement =
        event.target.parentNode.querySelector(".update-field")
      updateFieldElement.style.display = "block"
    }

    if (event.target.classList.contains("save-note")) {
      const updateInputElement = event.target.parentNode.querySelector("input")
      const updatedNote = updateInputElement.value

      notes = updateNote(notes, index, updatedNote)
      saveNotesToLocalStorage(notes)
      updateNotes(notesElement, notes)

      const updateFieldElement =
        event.target.parentNode.querySelector(".update-field")
      updateFieldElement.style.display = "none"
    }
  }
})
