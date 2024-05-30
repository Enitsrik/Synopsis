import { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';
import NotesList from './components/NotesList';
import Search from './components/Search';
import Header from './components/Header';

const App = () => {
  const [notes, setnotes] = useState([
    {
      id: nanoid(),
      text:"This is my first note!", 
      date:"22/05/2024"
  },
  {
    id: nanoid(),
    text:"This is my second note!", 
    date:"23/05/2024"
},
{
  id: nanoid(),
  text:"This is my third note!", 
  date:"21/05/2024"
},
{
  id: nanoid(),
  text:"This is my new note!", 
  date:"24/05/2024"
},
]);

const [searchText, setSearchText] = useState('');

const [darkMode, setDarkMode] = useState(false);

useEffect(()=> {
    const savedNotes = JSON.parse(localStorage.getItem('react-notes-app-data')
  );

  if(savedNotes){
    setnotes(savedNotes);
  }

}, []);

useEffect(() =>{
    localStorage.setItem(
      'react-notes-app-data', 
      JSON.stringify(notes)
    );
}, [notes]);

const addNote = (text) => {
    const date = new Date();
    const newNote = {
      id: nanoid(),
      text: text, 
      date: date.toLocaleDateString(),
    };
    const newNotes = [...notes, newNote];
    setnotes(newNotes);
};

const deleteNote = (id) => {
  const newNotes = notes.filter((note)=> note.id !== id);
  setnotes(newNotes);
}

  return (
  <div className={`${darkMode && 'dark-mode'}`}> 
      <div className='container'>
    <Header handleToggleDarkMode={setDarkMode} />
    <Search handleSearchNote={setSearchText} />
    <NotesList 
      notes={notes.filter((note)=> 
          note.text.toLowerCase().includes(searchText)
        )} 
        handleAddNote={addNote}
        handleDeleteNote={deleteNote}
      />
    </div>
  </div>
   
  );
};

export default App;