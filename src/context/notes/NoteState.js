import React from "react";

import NoteContext from "../noteContext";
import { useState } from "react";

const NoteState =(props)=>{

  const host="http://localhost/"

    const notesInitial=[]
    
      const [notes, setNotes] = useState(notesInitial)


      //get a note
      const getNote=async()=>{

        // api Call

        const response = await fetch(`${host}api/Notes/fetchallnotes`, {
         method: "GET", 
          
         headers: {
           "Content-Type": "application/json",
           "auth-token": localStorage.getItem('token')
         },
        
       });
       const json=await response.json();
       console.log(json)
       setNotes(json)

     }

      //add a note
      const addNote=async(title, description, tag)=>{

         // api Call

         const response = await fetch(`${host}api/Notes/addnote`, {
          method: "POST", 
           
          headers: {
            "Content-Type": "application/json",
            "auth-token": localStorage.getItem('token')
          },
          body: JSON.stringify({title, description, tag})
        });
        const note= await response.json();
        
        console.log("adding a new notes")
        setNotes(notes.concat(note))

      }
      //Delete a note


      const deleteNote =async(id)=>{
        // todo : api call

        const response = await fetch(`${host}api/Notes/deletenote/${id}`, {
          method: "DELETE", 
           
          headers: {
            "Content-Type": "application/json",
            "auth-token": localStorage.getItem('token')
          },
          
        });
        const json= response.json();
        console.log(json);

        const newNotes = notes.filter((note)=>{return note._id!==id})
        setNotes(newNotes);

      }
      //edit a note

      const editNote =async(id, title, description, tag)=>{

        // api Call

        const response = await fetch(`${host}api/Notes/updatenote/${id}`, {
          method: 'PUT', 
           
          headers: {
            "Content-Type": "application/json",
            "auth-token": localStorage.getItem('token')
          },
          body: JSON.stringify({title, description, tag})
        });
        const json= await response.json();
        console.log(json)

        //logic to edit in client

        let newNotes =JSON.parse(JSON.stringify(notes))
        for (let index = 0; index < newNotes.length; index++) {
          const element = newNotes[index];

          if(element._id===id){
            newNotes[index].title=title;
            newNotes[index].description=description;
            newNotes[index].tag=tag;
            break;
          }

        }
        setNotes(newNotes);
      }

    return(
        <NoteContext.Provider value ={{notes, addNote, deleteNote, editNote, getNote}}>

            {props.children}

        </NoteContext.Provider>
    )

}

export default NoteState;