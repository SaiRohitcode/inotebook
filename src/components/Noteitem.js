import React, {useContext} from 'react'
import noteContext from '../context/notes/noteContext'

const Noteitem = (props) => {
    const { note } = props;
    const context = useContext(noteContext);
    const {deleteNote} = context;
   
    return (
        <div className="col-md-3">
            <div className="card my-3" style={{width: "18rem"}}>
                <div className="card-body">
                    <div className="d-flex justify-content-between align-items-center">
                    <h5 className="card-title mb-0">{note.title}</h5>
                    <i className="fa-solid fa-pen-to-square mx-2" style = {{cursor : "pointer"}}></i>
                    <i className="fa-regular fa-trash-can mx-2" onClick={() => { console.log("clicked"); deleteNote(note._id);}} style = {{cursor : "pointer"}}></i>
                  
                    </div>
                    <h6 className="card-subtitle my-1 mb-2 text-body-secondary">{note.tag}</h6>
                    <p className="card-text">{note.description}</p>
                </div>
            </div>
        </div>
    )
}

export default Noteitem