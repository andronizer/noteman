import React from 'react'
import { MdDeleteForever } from 'react-icons/md'
import './tag.scss'

const Tag = ({ showTags, filterNotes, deleteTag }) => {
  return (
    <div className='tags_wrapper'>
      {showTags.map((tag, index) => {
        return tag ? (
          <div key={index} className='tag'>
            <span onClick={() => filterNotes(tag)}>{tag}</span>
            {tag !== '#all' && (
              <MdDeleteForever onClick={() => deleteTag(tag)} />
            )}
          </div>
        ) : null
      })}
    </div>
  )
}

export default Tag
