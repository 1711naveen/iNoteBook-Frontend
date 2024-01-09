import { useState } from "react";
import NoteContext from "./NoteContext";

const NoteState = (props) => {
    const HOST = "http://127.0.0.1:5000"
    const noteInitial = []

    const [notes, setnotes] = useState(noteInitial)

    //Get all notes
    const getNotes = async () => {
        //API call to fetch all notes
        const response = await fetch(`${HOST}/api/notes/fetchallnotes`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem('authToken')
                // "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjU5YzNhYWQ2YTk2MWE4OWIyYzkzNjBmIn0sImlhdCI6MTcwNDczNzQ1M30.aCsCcJVWruHL2yTobxUv76p7gqFOMiMPC9ta7qJrCxw"
            },
        });
        const json = await response.json();
        setnotes(json)
        console.log(json)
    }

    //Add a Note
    const addNote = async (title, description, tag) => {
        //API call
        const response = await fetch(`${HOST}/api/notes/addnote`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem('authToken')
                // "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjU5YzNhYWQ2YTk2MWE4OWIyYzkzNjBmIn0sImlhdCI6MTcwNDczNzQ1M30.aCsCcJVWruHL2yTobxUv76p7gqFOMiMPC9ta7qJrCxw"
            },

            body: JSON.stringify({ title, description, tag }),
        });
        const note = await response.json();
        setnotes(notes.concat(note));
    }

    //Delete a Note
    const deleteNote = async (id) => {
        const response = await fetch(`${HOST}/api/notes/deletenote/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem('authToken')
                // "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjU5YzNhYWQ2YTk2MWE4OWIyYzkzNjBmIn0sImlhdCI6MTcwNDczNzQ1M30.aCsCcJVWruHL2yTobxUv76p7gqFOMiMPC9ta7qJrCxw"
            },
        });

        const json = await response.json();

        const newNotes = notes.filter((note) => { return note._id !== id })
        setnotes(newNotes)
    }

    //Edit a note
    const editNote = async (id, title, description, tag) => {
        //Api call
        const response = await fetch(`${HOST}/api/notes/updatenote/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem('authToken')
                // "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjU5YzNhYWQ2YTk2MWE4OWIyYzkzNjBmIn0sImlhdCI6MTcwNDczNzQ1M30.aCsCcJVWruHL2yTobxUv76p7gqFOMiMPC9ta7qJrCxw"
            },

            body: JSON.stringify({ title, description, tag }),
        });
        const json = await response.json();
        console.log(json)

        let newNotes = JSON.parse(JSON.stringify(notes));



        //logic to edit in client
        for (let index = 0; index < newNotes.length; index++) {
            const element = newNotes[index];
            if (element._id === id) {
                newNotes[index].title = title;
                newNotes[index].description = description;
                newNotes[index].tag = tag;
                break;
            }
        }
        setnotes(newNotes)
    }



    return (
        <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote, getNotes }}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;