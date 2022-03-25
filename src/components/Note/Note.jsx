import React from 'react'
import { FaEdit } from 'react-icons/fa'
import { MdDeleteForever } from 'react-icons/md'
import './note.scss'

const Note = ({ notes, handleDelete, handleEdit }) => {
  return (
    <div className='notes_wrapper'>
      {notes.map((note) => (
        <div key={note.id} className='note_wrapper'>
          <p>{note.text}</p>
          <div className='btns_wrapper'>
            <FaEdit onClick={() => handleEdit(note)} />
            <MdDeleteForever onClick={() => handleDelete(note)} />
          </div>
        </div>
      ))}
    </div>
  )
}

export default Note
