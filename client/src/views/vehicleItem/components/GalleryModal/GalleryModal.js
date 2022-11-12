import './style.scss';

import { ModalWindow } from './../../../../components/ModalWindow/ModalWindow';
import { useEffect, useState } from 'react';
import Delete from '../../../../assets/icons/delete.svg';

export const GalleryModal = ({ show, onClose, imageArray, deleteAdditionalImage }) => {
  const [ picIndex, setPicIndex ] = useState(0);
  const [ srcArray, setSrcArray ] = useState([]);

  useEffect(() => {
    parseImages(imageArray);
  }, []);// eslint-disable-line react-hooks/exhaustive-deps

  function parseImages(imageArray) {
    setSrcArray(imageArray.map(item => typeof item === 'string' ? item : item.src));
  }

  function deleteImage() {
    if (imageArray.length === 1) {
      onClose();
    } else {
      if (picIndex === 0) {
        setPicIndex(picIndex + 1);
      } else {
        setPicIndex(picIndex - 1);
      }
    }
    deleteAdditionalImage(imageArray[picIndex]._id);
  }

  const modalHeader = <h1>Image Name</h1>;
  const modalBody =
    <div className="gallery-wrapper">
      <button onClick={ () => {
        if (picIndex > 0) {
          setPicIndex(picIndex - 1);
        }
      } }
      >Left
      </button>
      <img width="100%" src={ srcArray[picIndex] } className="main-image" alt="vehicle"/>
      <button onClick={ deleteImage } className="img-delete-button">
        <img className="delete-icon" src={ Delete } alt="delete"/>
      </button>
      <button onClick={ () => {
        if (picIndex < imageArray.length - 1) {
          setPicIndex(picIndex + 1);
        }
      } }>Right
      </button>
    </div>;

  return (<ModalWindow
    header={ modalHeader }
    body={ modalBody }
    show={ show }
    onClose={ onClose }
  />);

};