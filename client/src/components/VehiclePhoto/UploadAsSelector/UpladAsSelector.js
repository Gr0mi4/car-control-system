import './style.scss';

export const UploadAsSelector = ({ uploadImageType, setUploadImageType }) => {
  return (
    <div className="upload-as-selector">
      <p>Upload Image as:</p>
      <div className="radio-wrapper">
        <input
          type="radio"
          name="mainImage"
          id="main-image-radio"
          value={ uploadImageType }
          checked={ uploadImageType === 'mainImage' }
          onChange={ (evt) => setUploadImageType(evt.target.name) }
        />
        <label htmlFor="main-image-radio" className="label">Main</label>
        <input
          type="radio"
          name="additionalImage"
          id="additional-image-radio"
          value={ uploadImageType }
          checked={ uploadImageType === 'additionalImage' }
          onChange={ (evt) => setUploadImageType(evt.target.name) }
        />
        <label htmlFor="additional-image-radio" className="label">Additional</label>
      </div>
    </div>
  );
};