import './app.scss'
import { useState, useEffect } from 'react'
import Header from './components/Header/Header'
import Form from './components/Form/Form'
import Note from './components/Note/Note'
import Footer from './components/Footer/Footer'
import FilteredNotes from './components/FilteredNotes/FilteredNotes'
import Tag from './components/Tag/Tag'

function App() {
  const initialState = JSON.parse(localStorage.getItem('notes')) || []
  const [input, setInput] = useState('')
  const [notes, setNotes] = useState(initialState)
  const [tags, setTags] = useState([])
  const [editNote, setEditNote] = useState(null)
  const [showTags, setShowTags] = useState([])
  const [filteredNotes, setFilteredNotes] = useState([])
  const [isFiltered, setIsFiltered] = useState(false)

  useEffect(() => {
    localStorage.setItem('notes', JSON.stringify(notes))
  }, [notes])

  const resetApp = (e) => {
    localStorage.removeItem('notes')
    document.location.reload()
  }

  const deleteTag = (tag) => {
    if (notes && notes) {
      let changedNotes = notes.map((note) => {
        let tgs = note.tags
        let newTags = []
        let currentText = note.text
        let changedText = ''
        if (currentText.includes(tag)) {
          changedText = currentText
            .replace(tag, '')
            .replace(/\s{2,}/g, ' ')
            .trim()
          newTags = tgs.filter((currentTag) => currentTag !== tag)
          return { id: note.id, text: changedText, tags: newTags }
        } else {
          return note
        }
      })
      const filteredNotes = changedNotes.filter((note) => note.text !== '')
      setNotes(filteredNotes)
      setShowTags(showTags.filter((i) => i !== tag))
    }
  }

  function filterNotes(tag) {
    let filteredNotes = []
    if (tag === '#all') {
      filteredNotes = notes
      setIsFiltered(false)
    } else {
      for (let i = 0; i < notes.length; i++) {
        notes[i].tags &&
          notes[i].tags.forEach((currentTag) => {
            currentTag === tag && filteredNotes.push(notes[i])
          })
      }
      setIsFiltered(true)
    }
    setFilteredNotes(filteredNotes)
  }

  const handleDelete = ({ id }) => {
    setNotes(notes.filter((note) => note.id !== id))
  }

  const handleEdit = ({ id }) => {
    const findNote = notes.find((note) => note.id === id)
    setEditNote(findNote)
  }

  useEffect(() => {
    let hashtagsArray = []
    hashtagsArray = notes.map((item) => hashtagsArray.concat(item.tags)).flat()
    hashtagsArray = new Set(hashtagsArray)
    let hashtagsArrayWithAll = Array.from(hashtagsArray)
    let fullHashtagsArray = ['#all', ...hashtagsArrayWithAll]
    setShowTags(fullHashtagsArray)
  }, [notes])

  return (
    <div className='App'>
      <div className='app_wrapper'>
        <Header />
        <Form
          input={input}
          setInput={setInput}
          notes={notes}
          setNotes={setNotes}
          editNote={editNote}
          setEditNote={setEditNote}
          tags={tags}
          setTags={setTags}
        />
        {isFiltered ? (
          <FilteredNotes filteredNotes={filteredNotes} />
        ) : (
          <Note
            notes={notes}
            handleDelete={handleDelete}
            handleEdit={handleEdit}
          />
        )}
        <Tag
          showTags={showTags}
          filterNotes={filterNotes}
          deleteTag={deleteTag}
        />
        <button onClick={resetApp}>reset</button>
      </div>

      <Footer />
    </div>
  )
}

export default App
