
import { useState, useEffect, useContext } from 'react';
import { ThemeContext } from './ThemeContext';
import './App.css';

function App() {
  const [note, setNote] = useState('');
  const [notes, setNotes] = useState(() => {
    const savedNotes = localStorage.getItem('notes');
    return savedNotes ? JSON.parse(savedNotes) : [];
  });

  const { theme, toggleTheme } = useContext(ThemeContext);

  // Save notes whenever they change
  useEffect(() => {
    localStorage.setItem('notes', JSON.stringify(notes));
  }, [notes]);

  // Update browser tab title whenever note count changes
  useEffect(() => {
    document.title = `Notes (${notes.length})`;
  }, [notes.length]);

  const addNote = () => {
    if (note.trim() === '') return;

    setNotes([...notes, {
      id: Date.now(),
      text: note.trim()
    }]);

    setNote('');
  };

  const deleteNote = (id) => {
    setNotes(notes.filter((item) => item.id !== id));
  };

  return (
    <div className={`app ${theme}`}>
      <h1>My Notes</h1>

      <button onClick={toggleTheme}>
        Switch to {theme === 'light' ? 'Dark' : 'Light'} Mode
      </button>

      <div className="note-input">
        <input
          type="text"
          placeholder="Enter your note..."
          value={note}
          onChange={(e) => setNote(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') addNote();
          }}
        />

        <button onClick={addNote}>Add Note</button>
      </div>

      {notes.length === 0 ? (
        <p>No notes yet.</p>
      ) : (
        <ul>
          {notes.map((item) => (
            <li key={item.id}>
              <span>{item.text}</span>
              <button onClick={() => deleteNote(item.id)}>
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;
