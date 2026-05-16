import { useState } from 'react';
import noteContext from './noteContext';

const NoteState = (props) => {
  const host = "http://localhost:5000"
  const notesInitial = []
  const [notes, setNotes] = useState(notesInitial)
  
// fetch all notes
  const getNotes = async () => {

    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "auth-token" : localStorage.getItem('token')
        },
      });
      const json = await response.json();
      console.log(json);
      setNotes(json);
    }


  // Add a note
  const addNote = async (note) => {

    const response = await fetch(`${host}/api/notes/addnote`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token" : localStorage.getItem('token')
        },
        body: JSON.stringify(note),
      });

    const newNote = {
      "_id": Date.now().toString(),
      "user": "6a001bed5256a4216044ece5",
      "title": note.title,
      "description": note.description,
      "tag": note.tag,
      "date": "2026-05-12T13:20:29.402Z",
      "__v": 0
    };
    setNotes(notes.concat(newNote));
  }
  // delete a note
  const deleteNote = async (id) => {
    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token" : localStorage.getItem('token')
      }
    });
    const json = response.json();
    console.log(json);
    console.log("Deleting the note...")
    const newNotes = notes.filter((note) => { return note._id !== id })
    setNotes(newNotes);
  }
  // edit a note
  const editNote = async (id, title, description, tag) => {
    
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token" : localStorage.getItem('token')
      },
      body: JSON.stringify({title, description, tag}),
    });
    const json = await response.json();
    console.log(json);
    let newNotes = JSON.parse(JSON.stringify(notes));
    for (let index = 0; index < notes.length; index++) {
      const element = newNotes[index];
      if (element._id === id) {
        element.title = title;
        element.tag = tag;
        element.description = description;
        break;
      }
    }
    setNotes(newNotes);
  }
  return (
    <noteContext.Provider value={{ notes, addNote, deleteNote, editNote, getNotes }}>
      {props.children}
    </noteContext.Provider>
  )
}

export default NoteState
