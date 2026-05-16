import React, { useContext, useEffect, useRef, useState } from 'react'
import noteContext from '../context/notes/noteContext'
import Noteitem from './Noteitem';
import AddNote from './AddNote';
import { useNavigate } from 'react-router-dom';

const Notes = (props) => {
    const context = useContext(noteContext);
    const navigate = useNavigate();
    const { notes, getNotes, editNote } = context;
    useEffect(() => {
        if(localStorage.getItem('token')){
            getNotes()
        }
        else{
            navigate("/login");
        }
        // eslint-disable-next-line
    }, [])
    const ref = useRef(null)
     const refClose = useRef(null);
    const updateNote = (currentNote) => {
        ref.current.click();
        setNote({
        etitle: currentNote.title,
        etag: currentNote.tag,
        edescription: currentNote.description,
        _id: currentNote._id
    })
    }
    const [note, setNote] = useState({
            etitle : "",
            etag : "",
            edescription : "",
            _id : ""
        })
        const handleclick = (e) => {
            e.preventDefault();
            // so as to prevent the page reload
            editNote(note._id,note.etitle,note.edescription,note.etag);
            props.showAlert("Edited note successfully ", "success");
            refClose.current.click();
        }
        const onChange = (e) => {
            setNote({...note, [e.target.id] : e.target.value})
        }
    return (
        <>
            <AddNote showAlert = {props.showAlert}/>
            <button type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal" ref={ref}>
                Launch demo modal
            </button>
            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Edit Note</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <div>
                                <div className="container my-3">
                                    <h2>Add a note</h2>
                                    <form>
                                        <div className="mb-3">
                                            <label htmlFor="etitle" className="form-label">Title</label>
                                            <input type="text" className="form-control" id="etitle" value = {note.etitle} onChange={onChange} />
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="etag" className="form-label">Tag</label>
                                            <input type="text" className="form-control" id="etag" value = {note.etag} onChange={onChange} />
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="edescription" className="form-label">Description</label>
                                            <textarea className="form-control" id="edescription" value = {note.edescription} onChange={onChange} />
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button ref = {refClose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary" onClick={handleclick}>Update Note</button>
                        </div>
                    </div>
                </div>
            </div>
            {/* the div class must be row instead of container to make the cards to be in a single row */}
            <div className="row my-3">
                <h2>Your notes</h2>
                <div className = "container">
                {notes.length === 0 && 'No notes to display'}
                </div>
                {notes.map((note) => {
                    return <Noteitem key={note._id} updateNote={updateNote} note={note} showAlert = {props.showAlert}/>;
                })}
            </div>
        </>
    )
}

export default Notes