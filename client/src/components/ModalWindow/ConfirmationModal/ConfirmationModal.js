import './style.scss';

import { ModalWindow } from '../ModalWindow';
import { useCallback } from 'react';

export const ConfirmationModal = (
  {
    show,
    onClose,
    actionCallback,
    headerText = 'Are you sure?',
    message,
    acceptText = 'Yes',
    cancelText = 'No'
  }) => {
  const modalHeader = <h1 className="header-text">{ headerText }</h1>;
  const modalBody =
    <div className="message">{ message }</div>;

  function useCallback() {
    actionCallback();
    onClose();
  }

  const modalFooter =
    <div>
      <button className="accept button" onClick={ useCallback }>{ acceptText }</button>
      <button className="cancel button" onClick={ onClose }>{ cancelText }</button>
    </div>;

  return (
    <ModalWindow
      className="confirmation"
      header={ modalHeader }
      body={ modalBody }
      footer={ modalFooter }
      show={ show }
      onClose={ onClose }
    />
  );
};