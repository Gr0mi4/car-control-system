import './style.scss';

import { useState } from 'react';
import { useDispatch } from 'react-redux';

import { deleteNote } from '../../../../../store/dispatchers/vehicle';

import { ConfirmationModal } from '../../../../../components/ModalWindow/ConfirmationModal/ConfirmationModal';

import Delete from '../../../../../assets/icons/delete.svg';
import Pencil from '../../../../../assets/icons/pencil.svg';

import moment from 'moment';

export const NoteItem = ({ text, date, name, noteId, editNote }) => {
  const [ noteOpened, changeNoteState ] = useState(false);
  const [ confirmDeleteModalVisible, setConfirmDeleteModalVisible ] = useState(false);

  const dispatch = useDispatch();

  const formattedDate = moment.utc(new Date(date)).format('DD-MM-YYYY');

  const deleteMessage =
    <p>You want to delete <b>{ name }</b> created <b>{ formattedDate }</b> ?
      <br/>
      This action can't be undone
    </p>;

  function handleNoteClick(evt) {
    if (evt.target.alt) {
      // Check that click wasn't on the buttons
      return;
    }
    noteOpened ? changeNoteState(false) : changeNoteState(true);
  }

  return (
    <div className="note">
      <div className="note-header" onClick={ handleNoteClick }>
        <h3 className="note-name">{ name }</h3>
        <span>{ formattedDate }</span>
        { noteOpened &&
          <div className="buttons-block">
            <button className="delete-note icon-button" onClick={ () => setConfirmDeleteModalVisible(true) }>
              <img className="delete-icon" src={ Delete } alt="delete"/>
            </button>
            <button className="icon-button" onClick={ () => editNote(noteId) }>
              <img className="pencil-icon" src={ Pencil } alt="pencil"/>
            </button>
          </div>
        }
      </div>
      { noteOpened &&
        <div className="textarea">
          <p>
            { text }
          </p>
        </div>
      }
      { confirmDeleteModalVisible &&
        <ConfirmationModal
          show={ confirmDeleteModalVisible }
          actionCallback={ () => dispatch(deleteNote(noteId)) }
          message={ deleteMessage }
          onClose={ () => setConfirmDeleteModalVisible(false) }
        />
      }
    </div>);
};