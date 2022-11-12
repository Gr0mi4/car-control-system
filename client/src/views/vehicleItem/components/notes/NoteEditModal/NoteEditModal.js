import './style.scss';

import { ModalWindow } from '../../../../../components/ModalWindow/ModalWindow';
import { useState } from 'react';

export const NoteEditModal = ({ show, onClose, onSave, noteName, noteText }) => {

  const [ text, setText ] = useState(noteText);
  const [ name, setName ] = useState(noteName);

  const nameChangeHandler = event => {
    setName(event.target.value);
  };

  const textChangeHandler = event => {
    setText(event.target.value);
  };

  const modalHeader =
    <input value={ name } onChange={ nameChangeHandler } placeholder="Name of the note" className="name input"/>;
  const modalBody =
    <div className="modal-body">
      <div className="label-wrapper">
        <label className="text-label">Note text:</label>
        <span>[12.24.2023]</span>
      </div>
      <textarea value={ text } className="text input" onChange={ textChangeHandler }></textarea>
    </div>;
  const modalFooter =
    <button onClick={ () => onSave(text, name) } className="save button">Save</button>;

  return (<ModalWindow
    header={ modalHeader }
    body={ modalBody }
    footer={ modalFooter }
    show={ show }
    onClose={ onClose }
  />);

};