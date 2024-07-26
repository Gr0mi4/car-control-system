import './style.scss';

import { useState } from 'react';

import { NoImagePlug } from 'components/VehiclePhoto/NoImagePlug/NoImagePlug';

import Delete from 'icons/delete.svg';

export const VehicleImagePreview = ({ setPendingRequest, setImageSrc }) => {
  const [ imageUrl, setImageUrl ] = useState('');

  async function handleSelectImage(event) {
    // Showing preview to user
    setImageUrl(URL.createObjectURL(event.target.files[0]));

    // Creating form to upload image
    const form = new FormData();
    form.append('file', event.target.files[0]);

    // Disabling the save button for modal
    setPendingRequest(true);

    // Uploading image and getting link
    fetch('/api/images/uploadImage', { method: 'POST', body: form })
      .then(res => res.text())
      .then(res => {
        const result = JSON.parse(res);
        setImageSrc(result.url);
        setPendingRequest(false);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  function deleteImage() {
    setImageUrl('');
  }

  return (
    <div className="image-preview-wrapper">
      { imageUrl
        ?
        <div className="input-wrapper">
          <img className="image-preview" src={ imageUrl } alt="preview"/>
          { imageUrl &&
            <button onClick={ deleteImage } className="img-delete icon-button">
              <img className="delete-icon" src={ Delete } alt="delete"/>
            </button>
          }
          <input onChange={ handleSelectImage } id="file-upload" type="file" accept=".jpg, .png, .jpeg"/>
        </div>
        :
        <NoImagePlug handleSelectImage={ handleSelectImage }/>
      }
    </div>
  );
};