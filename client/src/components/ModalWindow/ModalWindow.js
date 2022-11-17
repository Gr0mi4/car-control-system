import './style.scss';

import ReactDOM from 'react-dom';
import { useEffect } from 'react';

import CrossIcon from '../../assets/icons/cross.svg';

export const ModalWindow = (props) => ReactDOM.createPortal(Modal(props), document.getElementById('root'));

export const Modal = ({ header, body, footer, show, onClose, className = '' }) => {

  const KEY = {
    ENTER: 'Enter',
    ESCAPE: 'Escape',
  };

  useEffect(() => {
    document.addEventListener('keydown', onKeyDown);

    return () => {
      document.removeEventListener('keydown', onKeyDown);
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  function onKeyDown(event) {
    if (event.key === KEY.ESCAPE) {
      onClose();
      return false;
    }
  }

  return (
    show &&
    <div className="modal-wrapper">
      <div className={ className + ' modal' }>
        <div className="modal-content">
          <div className="modal-header">{ header }</div>
          <div className="modal-body">{ body }</div>
          <div className="modal-footer">{ footer }</div>
        </div>
        <button className="close icon-button" onClick={ onClose }>
          <img src={ CrossIcon } className="icon" alt="close icon"/>
        </button>
      </div>
    </div>
  );
};