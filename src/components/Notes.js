import React, { useContext, useEffect, useRef, useState } from 'react'
import NoteContext from '../context/notes/NoteContext'
import NoteItem from './NoteItem';
import AddNote from './AddNote';
import { useNavigate } from 'react-router-dom';

const Notes = (props) => {
    const context = useContext(NoteContext)
    const { notes, getNotes, editNote } = context;
    const navigate = useNavigate();
    useEffect(() => {
        if (localStorage.getItem('authToken')) {
            getNotes();
        }
        else {
            navigate('/login');
        }
        // eslint-disable-next-line
    }, [])

    const ref = useRef(null)
    const refClose = useRef(null)
    const [Note, setNote] = useState({ id: "", etitle: "", edescription: "", etag: "" })

    const updateNote = (currentNote) => {
        ref.current.click();
        setNote({ id: currentNote._id, etitle: currentNote.title, edescription: currentNote.description, etag: currentNote.tag });
    }
    const handleclick = (e) => {
        e.preventDefault();
        // addNote(Note.title, Note.description, Note.tag)
        editNote(Note.id, Note.etitle, Note.edescription, Note.etag);
        refClose.current.click();
        props.showAlert("Note Updated Successfully ", "success");
    }
    const onchange = (e) => {
        setNote({ ...Note, [e.target.name]: e.target.value })
    }

    return (
        <>
            <AddNote showAlert={props.showAlert} />
            <button ref={ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
                Launch demo modal
            </button>
            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Modal title</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <div className="mb-3 my-3">
                                    <label htmlFor="etitle" className="form-label">Title</label>
                                    <input type="text" className="form-control" id="etitle" name='etitle' value={Note.etitle} aria-describedby="emailHelp" onChange={onchange} minLength={3} required />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="edescription" className="form-label">Description</label>
                                    <input type="text" className="form-control" id="edescription" name='edescription' value={Note.edescription} onChange={onchange} minLength={5} required />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="etag" className="form-label">Tag</label>
                                    <input type="text" className="form-control" id="etag" name='etag' value={Note.etag} onChange={onchange} required />
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button ref={refClose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button disabled={Note.etitle.length < 4 || Note.edescription.length < 6} type="button" className="btn btn-primary" onClick={handleclick}>Update Notes</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row my-3">
                <h1>Your notes</h1>
                <div className="container mx-1">{notes.length === 0 && "No Notes to display"}</div>

                {notes && notes.map((note) => {
                    return <NoteItem key={note._id} updateNote={updateNote} note={note} showAlert={props.showAlert} />
                })}
            </div>
        </>
    )
}

export default Notes
