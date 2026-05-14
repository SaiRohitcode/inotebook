import React, { useContext, useState } from 'react'
import noteContext from '../context/notes/noteContext'

const AddNote = () => {
    const context = useContext(noteContext);
    const {addNote} = context;
    const [note, setNote] = useState({
        title : "",
        tag : "",
        description : "",
        _id : ""
    })
    const handleclick = (e) => {
        e.preventDefault();
        // so as to prevent the page reload
        addNote(note);
    }
    const onChange = (e) => {
        setNote({...note, [e.target.id] : e.target.value})
    }
    return (
        <div>
            <div className="container my-3">
                <h2>Add a note</h2>
                <form>
                    <div className="mb-3">
                        <label htmlFor="title" className="form-label">Title</label>
                        <input type="text" className="form-control" id="title" onChange={onChange}/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="tag" className="form-label">Tag</label>
                        <input type="text" className="form-control" id="tag" onChange={onChange}/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="description" className="form-label">Description</label>
                        <textarea className="form-control" id="description" onChange={onChange}/>
                    </div>

                    <button type="submit" className="btn btn-primary" onClick={handleclick}>Add Note</button>
                </form>
            </div>
        </div>
    )
}

export default AddNote