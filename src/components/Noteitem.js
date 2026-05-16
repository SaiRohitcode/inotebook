import React, { useContext } from 'react'
import noteContext from '../context/notes/noteContext'

const Noteitem = (props) => {
    const { note , updateNote} = props;
    const context = useContext(noteContext);
    const { deleteNote } = context;

    return (
        <div className="col-md-3">
            <div className="card my-3" style={{ width: "18rem" }}>
                <div className="card-body">
                    <div className="d-flex justify-content-between align-items-center">
                        <h5 className="card-title mb-0">{note.title}</h5>

                        <div>
                            <span 
                            onClick={() => updateNote(note)}
                            style={{ cursor: "pointer" }}>
                                <i className="fa-solid fa-pen-to-square mx-2"></i>
                            </span>

                            <span
                                onClick={() => {deleteNote(note._id); props.showAlert("Deleted note successfully ", "success")}}
                                style={{ cursor: "pointer" }}
                            >
                                <i className="fa-solid fa-trash mx-2"></i>
                            </span>
                        </div>
                    </div>

                    <h6 className="card-subtitle my-1 mb-2 text-body-secondary">
                        {note.tag}
                    </h6>

                    <p className="card-text">
                        {note.description}
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Noteitem