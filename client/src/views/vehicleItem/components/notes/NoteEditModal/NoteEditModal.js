import './style.scss';
import moment from 'moment';

import { ModalWindow } from 'components/ModalWindow/ModalWindow';
import { useState } from 'react';

export const NoteEditModal = ({ show, onClose, onSave, note }) => {

  const [ text, setText ] = useState(note.text || '');
  const [ name, setName ] = useState(note.name || '');
  const [ errorVisible, setErrorVisible ] = useState(false);

  const nameChangeHandler = event => {
    setName(event.target.value);
  };

  const textChangeHandler = event => {
    setText(event.target.value);
  };

  function handleSave(text, name, noteId) {
    if (text && name) {
      setErrorVisible(false);
      onSave(text, name, noteId);
    } else {
      setErrorVisible(true);
    }
  }

  const modalHeader =
    <input value={ name } onChange={ nameChangeHandler } placeholder="Name of the note" className="name input"/>;
  const modalBody =
    <div className="modal-body">
      <div className="label-wrapper">
        <label className="text-label">Note text:</label>
        <p>Date: { moment().format('DD-MM-YYYY') }</p>
      </div>
      <textarea value={ text } className="text input" onChange={ textChangeHandler }></textarea>
      { errorVisible && <p className="error">Fields can't be empty</p> }
    </div>;
  const modalFooter =
    <button onClick={ () => handleSave(text, name, note._id) } className="save button">Save</button>;
  return (
    <ModalWindow
      className="note-edit-modal"
      header={ modalHeader }
      body={ modalBody }
      footer={ modalFooter }
      show={ show }
      onClose={ onClose }
    />
  );

};