import React from 'react'
import './filteredNotes.scss'

const FilteredNotes = ({ filteredNotes }) => {
  return (
    <div className='filteredNotes_wrapper'>
      {filteredNotes.map((filteredNote) => (
        <div key={filteredNote.id} className='filteredNote_wrapper'>
          <p>{filteredNote.text}</p>
        </div>
      ))}
    </div>
  )
}

export default FilteredNotes
