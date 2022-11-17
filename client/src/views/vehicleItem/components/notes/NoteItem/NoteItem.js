import './style.scss';
import moment from 'moment';
import { useState } from 'react';
import Delete from '../../../../../assets/icons/delete.svg';
import Pencil from '../../../../../assets/icons/pencil.svg';
import { ConfirmationModal } from '../../../../../components/ModalWindow/ConfirmationModal/ConfirmationModal';

export const NoteItem = (props) => {
  const [ noteOpened, changeNoteState ] = useState(false);
  const [ confirmDeleteModalVisible, setConfirmDeleteModalVisible ] = useState(false);

  const formattedDate = moment.utc(new Date(props.date)).format('DD-MM-YYYY');

  const deleteMessage =
    <p>You want to delete <b>{ props.name }</b> created <b>{ formattedDate }</b> ?
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
        <h3 className="note-name">{ props.name }</h3>
        <span>{ formattedDate }</span>
        { noteOpened &&
          <div className="buttons-block">
            <button className="delete-note icon-button" onClick={ () => setConfirmDeleteModalVisible(true) }>
              <img className="delete-icon" src={ Delete } alt="delete"/>
            </button>
            <button className="icon-button" onClick={ () => props.editNote(props.noteId) }>
              <img className="pencil-icon" src={ Pencil } alt="pencil"/>
            </button>
          </div>
        }
      </div>
      { noteOpened &&
        <div className="textarea">
          <p>
            { props.text }
          </p>
        </div>
      }
      { confirmDeleteModalVisible &&
        <ConfirmationModal
          show={ confirmDeleteModalVisible }
          actionCallback={ () => props.deleteNote(props.noteId) }
          message={ deleteMessage }
          onClose={ () => setConfirmDeleteModalVisible(false) }
        />
      }
    </div>);
};