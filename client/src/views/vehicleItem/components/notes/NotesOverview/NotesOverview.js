import './style.scss';

import { NoteList } from '../NoteList/NoteList';
import { NoteEditModal } from '../NoteEditModal/NoteEditModal';
import { useState } from 'react';

export const NotesOverview = (props) => {

  const [ noteEditVisible, setNoteEditVisible ] = useState(false);
  const [ selectedNote, setSelectedNote ] = useState({});

  function editNote(noteId) {
    setSelectedNote(props.vehicleNotes.find(item => item._id === noteId));
    setNoteEditVisible(true);
  }

  function saveNote(text, name, noteId) {
    setNoteEditVisible(false);
    let action;
    // Selecting an action depending if note already exist
    Object.keys(selectedNote).length > 0 ? action = props.editNote : action = props.addNote;
    action(text, name, noteId)
      .then(res => props.setVehicleNotes(JSON.parse(res)))
      .finally(() => {
        setSelectedNote({});
      });
  }

  function closeModal() {
    setSelectedNote({});
    setNoteEditVisible(false);
  }

  return (
    <div className="notes-overview">
      <h2 className="overview-header">Notes</h2>
      { props.vehicleNotes.length &&
        <NoteList notesArray={ props.vehicleNotes } deleteNote={ props.deleteNote } editNote={ editNote }/>
      }
      <button className="add button" onClick={ () => setNoteEditVisible(true) }>New note</button>
      { noteEditVisible &&
        <NoteEditModal
          show={ noteEditVisible }
          onClose={ closeModal }
          onSave={ saveNote }
          note={ selectedNote }
        />
      }
    </div>
  );
};