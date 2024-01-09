import React, { useContext, useState } from 'react'
import NoteContext from '../context/notes/NoteContext';

const AddNote = (props) => {
    const context = useContext(NoteContext)
    const { addNote } = context;
    const [Note, setNote] = useState({ title: "", description: "", tag: "" })

    const handleclick = (e) => {
        e.preventDefault();
        addNote(Note.title, Note.description, Note.tag)
        setNote({ title: "", description: "", tag: "" })
        props.showAlert("Note Added Successfully ", "success");
    }
    const onchange = (e) => {
        setNote({ ...Note, [e.target.name]: e.target.value })
    }

    return (
        <div>
            <div className="container my-3">
                <h1>Add a note</h1>
                <form>
                    <div className="mb-3 my-3">
                        <label htmlFor="title" className="form-label">Title</label>
                        <input type="text" className="form-control" id="title" name='title' aria-describedby="emailHelp" onChange={onchange} minLength={3} value={Note.title} required />
                        <div className="col-auto">
                            <span id="passwordHelpInline" className="form-text">
                                Description must be greater than 3 characters.
                            </span>
                        </div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="description" className="form-label">Description</label>
                        <input type="text" className="form-control" id="description" name='description' onChange={onchange} minLength={3} value={Note.description} required />
                        <div className="col-auto">
                            <span id="passwordHelpInline" className="form-text">
                                Description must be greater than 5 characters.
                            </span>
                        </div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="tag" className="form-label">Tag</label>
                        <input type="text" className="form-control" id="tag" name='tag' onChange={onchange} value={Note.tag} required />
                    </div>

                    <button disabled={Note.title.length < 4 || Note.description.length < 6} type="submit" className="btn btn-primary" onClick={handleclick}>Add Note</button>
                </form>
            </div>

        </div>
    )
}

export default AddNote
