import './style.scss';

import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { removeVehicleAdditionalImage } from '../../../../store/dispatchers/vehicle';

import { ModalWindow } from './../../../../components/ModalWindow/ModalWindow';
import { ImagesPreviews } from './ImagesPreviews/ImagesPreviews';

import Delete from '../../../../assets/icons/delete.svg';
import ArrowRight from '../../../../assets/icons/arrow-right.svg';
import ArrowLeft from '../../../../assets/icons/arrow-left.svg';

export const GalleryModal = ({ show, onClose }) => {
  const [ picIndex, setPicIndex ] = useState(0);
  const [ srcArray, setSrcArray ] = useState([]);

  const imageArray = useSelector(state => state.vehicle.images);

  const dispatch = useDispatch();

  useEffect(() => {
    parseImages(imageArray);
  }, [ imageArray ]);

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
    dispatch(removeVehicleAdditionalImage(imageArray[picIndex]._id));
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