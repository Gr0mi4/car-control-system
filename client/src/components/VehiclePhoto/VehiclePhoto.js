import './style.scss';

import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { updateVehicleInfo, uploadVehicleAdditionalImage } from 'store/dispatchers/vehicle';

import { NoImagePlug } from './NoImagePlug/NoImagePlug';
import { Crop } from 'components/Crop/Crop';
import { UploadAsSelector } from './UploadAsSelector/UpladAsSelector';

import Delete from 'icons/delete.svg';
import Upload from 'icons/upload.svg';
import AddImage from 'icons/add-image.svg';
import CropImage from 'icons/crop.svg';

export const VehiclePhoto = ({ className, showGallery }) => {
  const dispatch = useDispatch();

  const [ src, setSrc ] = useState('');
  const [ previewMode, setPreviewMode ] = useState(false);
  const [ cropMode, setCropMode ] = useState(false);
  const [ file, setFile ] = useState({});
  const [ uploadImageType, setUploadImageType ] = useState('mainImage');

  const vehicleInfo = useSelector(state => state.vehicle.info);
  const imageLink = vehicleInfo.image;

  async function handleSelectImage(event) {
    // Check in case user canceled image selection
    if (event.target.files[0]) {
      setFile(event.target.files[0]);
      setSrc(URL.createObjectURL(event.target.files[0]));
      setPreviewMode(true);
      if (!src && !imageLink) {
        await uploadPhoto(event.target.files[0]);
      }
    }
  }

  async function uploadPhoto(file) {
    const form = new FormData();
    form.append('file', file);
    fetch('/api/images/uploadImage', { method: 'POST', body: form })
      .then(res => res.text())
      .then(res => {
        const result = JSON.parse(res);
        if (uploadImageType === 'mainImage') {
          dispatch(updateVehicleInfo('image', result.url));
        } else {
          dispatch(uploadVehicleAdditionalImage(result.url, 'someName'));
          // Returning main app because additional in gallery now
          setSrc('');
        }
        setPreviewMode(false);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  function handleDeleteImage() {
    setSrc('');
    if (previewMode) {
      setPreviewMode(false);
    } else {
      dispatch(updateVehicleInfo('image', ''));
    }
  }

  return (
    <div className={ className ? className : 'vehicle-photo' }>
      { imageLink || src
        ?
        <div className="main-image-wrapper">
          <Crop
            saveImage={ (newUrl) => dispatch(updateVehicleInfo('image', newUrl)) }
            imageLink={ imageLink }
            cropMode={ cropMode }
            setCropMode={ setCropMode }
          >
            <img
              className="main-image"
              src={ previewMode ? src : imageLink || src }
              alt="Main vehicle image"
              onClick={ () => cropMode ? null : showGallery() }
            />
          </Crop>
          { imageLink && !cropMode &&
            <div className="image-panel">
              { !cropMode &&
                <img
                  src={ CropImage }
                  alt="crop"
                  className="crop-image icon-button"
                  onClick={ () => setCropMode(true) }
                />
              }
              <label htmlFor="file-upload">
                <img src={ AddImage } alt="add" className="add-image icon-button"/>
              </label>
              <input onChange={ handleSelectImage } id="file-upload" type="file" accept=".jpg, .png, .jpeg"/>
              { previewMode && <UploadAsSelector { ...{ setUploadImageType, uploadImageType } }/> }
              <button onClick={ handleDeleteImage } className="img-delete icon-button">
                <img className="delete-icon" src={ Delete } alt="delete"/>
              </button>
              { previewMode &&
                <button onClick={ () => uploadPhoto(file) } className="img-upload icon-button">
                  <img className="upload-icon" src={ Upload } alt="upload"/>
                </button>
              }
            </div>
          }
        </div>
        :
        <NoImagePlug handleSelectImage={ handleSelectImage }/>
      }
    </div>
  );
};