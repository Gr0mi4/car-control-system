import './style.scss';
import { useState } from 'react';
import Delete from '../../../../../assets/icons/delete.svg';

export const NoteItem = (props) => {
  const [ noteOpened, changeNoteState ] = useState(false);

  function handleNoteClick() {
    noteOpened ? changeNoteState(false) : changeNoteState(true);
  }

  return (
    <div>
      <div className="note-header" onClick={ handleNoteClick }>
        <h3>{ props.name }</h3>
        <span>{ props.date }</span>
        <button className="delete-note button" onClick={ () => props.deleteNote(props.noteId) }>
          <img className="delete-icon" src={ Delete } alt="delete"/>
        </button>
        <button className="button" onClick={ () => props.editNote(props.noteId) }>
          <span>Edit</span>
        </button>
      </div>
      { noteOpened &&
        <div>
          { props.text }
        </div>
      }
    </div>);
};