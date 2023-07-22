export function addNote(notes, note) {
  return [...notes, note]
}

export function deleteNote(notes, index) {
  return notes.filter((note, noteIndex) => noteIndex !== index)
}

export function updateNote(notes, index, updatedNote) {
  return notes.map((note, noteIndex) => {
    if (noteIndex === index) {
      return updatedNote
    }
    return note
  })
}

export function saveNotesToLocalStorage(notes) {
  localStorage.setItem("notes", JSON.stringify(notes))
}

export function loadNotesFromLocalStorage() {
  const notes = localStorage.getItem("notes")

  if (notes) {
    return JSON.parse(notes)
  }

  return []
}
