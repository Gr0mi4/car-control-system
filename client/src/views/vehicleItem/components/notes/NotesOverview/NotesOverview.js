import './style.scss';

import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { addNote, editNote } from 'store/dispatchers/vehicle';

import { NoteList } from '../NoteList/NoteList';
import { NoteEditModal } from '../NoteEditModal/NoteEditModal';

export const NotesOverview = () => {
  const dispatch = useDispatch();

  const vehicleNotes = useSelector(state => state.vehicle.notes);

  const [ noteEditVisible, setNoteEditVisible ] = useState(false);
  const [ selectedNote, setSelectedNote ] = useState({});

  function changeNote(noteId) {
    setSelectedNote(vehicleNotes.find(item => item._id === noteId));
    setNoteEditVisible(true);
  }

  function saveNote(text, name, noteId) {
    setNoteEditVisible(false);
    let action;
    // Selecting an action depending if note already exist
    Object.keys(selectedNote).length > 0 ? action = editNote : action = addNote;
    dispatch(action({ text, name, id: noteId }))
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
      { !!vehicleNotes.length &&
        <NoteList openNote={ changeNote }/>
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