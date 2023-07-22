export function updateNotes(notesElement, notes) {
  const elements = notes.map((note, index) => {
    return /* HTML */ `
      <div>
        <p>${note}</p>
        <div class="update-field">
          <input type="text" id="update-input-${index}" />
          <button class="save-note" data-index="${index}">Actualizar</button>
        </div>
        <button data-index="${index}" class="delete-note">Borrar</button>
      </div>
    `
  })

  notesElement.innerHTML = elements.join("")
}

export function getNoteInputValue(noteInputElement) {
  return noteInputElement.value
}
export function clearNoteInput(noteInputElement) {
  return (noteInputElement.value = "")
}
