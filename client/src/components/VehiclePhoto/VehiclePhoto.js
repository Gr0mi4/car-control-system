import './style.scss';

import { useHttp } from '../../hooks/http.hook';

import { NoImagePlug } from './NoImagePlug/NoImagePlug';

import Delete from '../../assets/icons/delete.svg';
import Upload from '../../assets/icons/upload.svg';
import AddImage from '../../assets/icons/add-image.svg';

import { useState } from 'react';

const CLOUD_NAME = process.env.REACT_APP_CLOUD_NAME;
const API_KEY = process.env.REACT_APP_CLOUD_API_KEY;

export const VehiclePhoto = (
  {
    imageLink,
    className,
    vehicleCreationMode,
    updateVehicleImage,
    uploadAdditionalImage,
    showGallery
  }) => {
  const { request } = useHttp();

  const [ src, setSrc ] = useState('');
  const [ previewMode, setPreviewMode ] = useState(false);

  const [ file, setFile ] = useState({});
  const [ signature, setSignature ] = useState(null);
  const [ timestamp, setTimestamp ] = useState(null);

  const [ uploadedImageType, setUploadedImageType ] = useState('mainImage');

  async function handleSelectImage(event) {
    const file = event.target.files[0];
    setFile(event.target.files[0]);
    try {
      request('/api/vehicle/getVariables', 'GET')
        .then((res) => {
          setSrc(URL.createObjectURL(file));
          setPreviewMode(true);
          const results = JSON.parse(res);
          setSignature(results.signature);
          setTimestamp(results.timestamp);
          return { signature: results.signature, timestamp: results.timestamp };
        })
        .then(({ signature, timestamp }) => {
          // Image instantly uploaded if it would be first one
          if (vehicleCreationMode || (!src && !imageLink)) {
            uploadPhoto(signature, timestamp, event.target.files[0]);
          } else {

          }
        });
    } catch (e) {
      console.error(e);
    }
  }

  async function uploadPhoto(signature, timestamp, file) {
    const form = new FormData();
    form.append('file', file);
    if (signature && timestamp) {
      fetch(
        `https://api.cloudinary.com/v1_1/${ CLOUD_NAME }/image/upload?api_key=${ API_KEY }&timestamp=${ timestamp }&signature=${ signature }`,
        { method: 'POST', body: form })
        .then(res => {
          return res.text();
        })
        .then(res => {
          const result = JSON.parse(res);
          if (uploadedImageType === 'mainImage') {
            updateVehicleImage('image', result.secure_url);
          } else {
            uploadAdditionalImage(result.secure_url, 'someName');
          }
          setPreviewMode(false);
          setSrc('');
        });
    } else {
      console.error('No signature or Timestamp', signature, timestamp);
    }
  }

  function handleDeleteImage() {
    if (previewMode) {
      setSrc('');
      setPreviewMode(false);
    } else {
      updateVehicleImage('image', '');
    }
  }

  function handleRadioClick(event) {
    setUploadedImageType(event.target.name);
  }

  return (
    <div className={ className ? className : 'vehicle-photo' }>
      { src || imageLink
        ?
        <div className="main-image-wrapper">
          <img className="main-image" src={ src || imageLink } alt="Vehicle" onClick={ showGallery }/>
          { imageLink &&
            <div className="image-panel">
              <label htmlFor="file-upload">
                <img src={ AddImage } alt="add" className="add-image icon-button"/>
              </label>
              <input onChange={ handleSelectImage } id="file-upload" type="file" accept=".jpg, .png, .jpeg"/>
              { previewMode &&
                <div>
                  <p>Upload as:</p>
                  <div className="radio-wrapper">
                    <input
                      type="radio"
                      name="mainImage"
                      id="main-image-radio"
                      value={ uploadedImageType }
                      checked={ uploadedImageType === 'mainImage' }
                      onChange={ handleRadioClick }
                    />
                    <label htmlFor="main-image-radio" className="label">Main Image</label>
                    <input
                      type="radio"
                      name="additionalImage"
                      id="additional-image-radio"
                      value={ uploadedImageType }
                      checked={ uploadedImageType === 'additionalImage' }
                      onChange={ handleRadioClick }
                    />
                    <label htmlFor="additional-image-radio" className="label">Additional Image</label>
                  </div>
                </div>
              }
              <button onClick={ handleDeleteImage } className="img-delete icon-button">
                <img className="delete-icon" src={ Delete } alt="delete"/>
              </button>
              { previewMode && !vehicleCreationMode &&
                <button onClick={ () => uploadPhoto(signature, timestamp, file) } className="img-upload icon-button">
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