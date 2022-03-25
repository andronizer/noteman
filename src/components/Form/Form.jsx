import React, { useEffect } from 'react'
import { v4 as uuidv4 } from 'uuid'
import './form.scss'

const Form = ({
  input,
  setInput,
  notes,
  setNotes,
  editNote,
  setEditNote,
  tags,
  setTags,
}) => {
  const updateNote = (text, id, tags) => {
    const newNotes = notes.map((note) =>
      note.id === id ? { text, id, tags } : note
    )
    setNotes(newNotes)
    setEditNote('')
  }

  const handleChange = (e) => {
    setInput(e.target.value)
  }

  function regex() {
    const tagsArray = tags
    let inputText = input
    const reg = new RegExp('#([^\\s]*)', 'g')
    const stringsWithSharp = inputText.match(reg)

    stringsWithSharp?.map((tag) => {
      const splittedTag = tag.split('#')
      let notEmptyTag = splittedTag
        .filter((element) => {
          return element !== ''
        })
        .pop()

      if (!notEmptyTag) {
        return
      }

      if (notEmptyTag.substr(notEmptyTag.length - 1) === ':') {
        notEmptyTag = notEmptyTag.slice(0, -1)
      }

      const validatedTag = `#${notEmptyTag}`
      tagsArray.push(validatedTag)
    })
    return tagsArray
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    regex()
    if (!editNote) {
      if (input.trim().length) {
        setNotes([...notes, { id: uuidv4(), text: input, tags: tags }])
      }
    } else {
      updateNote(input, editNote.id, tags)
    }
    setTags([])
    setInput('')
  }

  useEffect(() => {
    if (editNote) {
      setInput(editNote.text)
    } else {
      setInput('')
    }
  }, [setInput, editNote])

  return (
    <form onSubmit={handleSubmit} className='form_wrapper'>
      <textarea
        type='text'
        cols='10'
        rows='4'
        placeholder='Enter your Note'
        value={input}
        required
        onChange={handleChange}
      />
      <button type='submit'>{editNote ? 'Save' : 'Add'}</button>
    </form>
  )
}

export default Form
