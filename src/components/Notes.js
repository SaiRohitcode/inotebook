import React, { useContext, useEffect } from 'react'
import noteContext from '../context/notes/noteContext'
import Noteitem from './Noteitem';
import AddNote from './AddNote';

 const Notes = () => {
     const context = useContext(noteContext);
     const {notes, getNotes} = context;
     useEffect(() => {
        getNotes()
     },[])
    return (
        <>  
        <AddNote/>
        {/* the div class must be row instead of container to make the cards to be in a single row */}
        <div className="row my-3">
            <h2>Your notes</h2>
            {notes.map((note) => {
                return <Noteitem key = {note._id}note = {note}/>;
            })}
        </div>
        </>
    )
}

export default Notes