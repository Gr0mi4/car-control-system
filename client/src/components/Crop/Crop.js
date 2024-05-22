import './style.scss';
import 'react-image-crop/dist/ReactCrop.css';

import { useState } from 'react';
import { useSelector } from 'react-redux';
import ReactCrop from 'react-image-crop';

import { useHttp } from 'hooks/http.hook';

import Save from 'icons/save.svg';
import Cross from 'icons/cross.svg';

export const Crop = ({ saveImage, children, cropMode, setCropMode }) => {
  const [ crop, setCrop ] = useState(null);

  const { request } = useHttp();

  const vehicleInfo = useSelector(state => state.vehicle.info);
  const imageLink = vehicleInfo.image;

  function handleCrop(crop, percentCrop) {
    if (cropMode) {
      setCrop(percentCrop);
    }
  }

  async function saveCrop() {
    try {
      await request('/api/images/cropImage', 'POST', { imageLink, crop })
        .then((res) => {
          const newAvatar = JSON.parse(res);
          if (newAvatar) {
            setCropMode(false);
            setCrop(null);
            saveImage(newAvatar);
          }
        });
    } catch (e) {
      console.log(e);
    }
  }

  function exitCropMode() {
    setCrop(null);
    setCropMode(false);
  }

  return (
    <>
      <ReactCrop crop={ crop } onChange={ handleCrop }>
        { children }
      </ReactCrop>
      { cropMode &&
        <div className="image-panel crop-panel">
          <img src={ Save } alt="save crop" className="save-image icon-button" onClick={ saveCrop }/>
          <img src={ Cross } alt="cancel crop" className="cancel-image icon-button" onClick={ exitCropMode }/>
        </div>
      }
    </>
  );
};