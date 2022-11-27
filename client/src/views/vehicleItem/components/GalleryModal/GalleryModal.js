import './style.scss';

import { ModalWindow } from './../../../../components/ModalWindow/ModalWindow';
import { useEffect, useState } from 'react';
import Delete from '../../../../assets/icons/delete.svg';
import ArrowRight from '../../../../assets/icons/arrow-right.svg';
import ArrowLeft from '../../../../assets/icons/arrow-left.svg';
import { ImagesPreviews } from './ImagesPreviews/ImagesPreviews';

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
    parseImages(imageArray);
  }

  function nextImage() {
    if (picIndex > 0) {
      setPicIndex(picIndex - 1);
    }
  }

  function previousImage() {
    if (picIndex < imageArray.length - 1) {
      setPicIndex(picIndex + 1);
    }
  }

  const modalHeader = <h1>Image Name</h1>;
  const modalBody =
    <div className="gallery-wrapper">
      <img width="100%" src={ srcArray[picIndex] } className="main-image" alt="vehicle"/>
      <div className="preview-select">
        <button onClick={ nextImage } className="icon-button">
          <img src={ ArrowLeft } alt="arrow-left"/>
        </button>
        <ImagesPreviews
          srcArray={ srcArray }
          picIndex={ picIndex }
          handleSelectImage={ (index) => setPicIndex(index) }
        />
        <button onClick={ previousImage } className="icon-button">
          <img src={ ArrowRight } alt="arrow-right"/>
        </button>
      </div>
      <button onClick={ deleteImage } className="img-delete icon-button">
        <img className="delete-icon" src={ Delete } alt="delete"/>
      </button>
    </div>;

  return (
    <ModalWindow
      className="gallery"
      header={ modalHeader }
      body={ modalBody }
      show={ show }
      onClose={ onClose }
    />
  );

};